(function(){

	let fs = require('fs');
	let async = require('async');
	let shorthash = require('shorthash');

	/*
		Retrive an account's information (user name, email, id)

		@param {connection} connection - MongoDB connection object
		@param {user} user - User object
		@param {res} res - HTTP response object

	*/
	module.exports.getAccountData = function(connection, user, res){

		let accounts = connection.collection("accounts");	

		accounts.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(!err){ 

				if(object){

					res.write(JSON.stringify(object));
					res.status(200);
					return res.end();
				}
				else{

					res.status(500);
					return res.end();
				}
			}
			else{

				res.status(500);
				return res.end();
			}
		});
	}

	/*
		Checks to see if an account has already been added to the database
		If the account has been, nothing happens. If there is no record, we 
		add it.

		@param {connection} connection - MongoDB connection object
		@param {object} contents - object containing the user id, email, and displayName 
	*/
	module.exports.addNewAccount = function(connection, contents) {
		
		let accounts = connection.collection("accounts");	
		let files = connection.collection("files");
		let games = connection.collection("games");

		let id = contents.id;
		let email = contents.email;
		let displayName = contents.email;

		//Check to see if the account already exists
		accounts.findOne({
			user_id : id,
        	user_email : email
  		}, function(err, object){

        	if(object == null){ 

				accounts.insert({
					user_id : id,
					user_email : email,
					user_displayName : displayName
				}, function(err, results){

					if(err){
						console.log("Error adding new account:\n", err);
					}
					else{
						console.log("Successfully created new account");

						/*
							Add an entry to the files collection for the files
							that will be associated with this account.

							At this point, it's just the id and the email
							to uniquely identify the document.
						*/
						files.insert({
							user_id : id,
							user_email : email,
							user_files : []
						}, function(err, results){

							if(err){
								console.log("Error adding files document:\n", err);
							}
							else{

								console.log("Successfully created files document");

								/*
									Add an entry to the games collection for the game
									code that will be associated with this account.
								*/
								games.insert({
									user_id : id,
									user_email : email,
									user_games : []
								}, function(err, results){

									if(err){
										console.log("Error adding games document:\n", err);
									}
									else{
										console.log("Successfully created games document");
									}
								});
							}
						});
					}
				});
        	}
        	else{
        		console.log("Did not add new account, account already created with this email");
        	}
        });
	}

	/*
		So we don't do unecessary requests, this function is called
		to make sure that a file to be uploaded or game to be created is 
		not already made.

		@param {connection} connection - MongoDB connection object
		@param {object} item - the content in question being verified (game name, file name, gfile name)
		@param {string} type - specifies the type of item being verified and which case to enter (game, file, gfile)
		@param {user} user - user object
		@param {object} data - data payload that goes along with the item for insertion into database
		@param {res} res - HTTP Response object
	*/
	module.exports.checkIfExists = function(connection, item, type, user, data, res){

		let games = connection.collection("games");
		let files = connection.collection("files");

		switch (type){

			/*
				TODO: Rewrite the game and gfile cases to be similar to file
			*/	
			case "game" :

				games.findOne({
					user_id : user.id,
					user_email : user.email,
					user_games : {
						$elemMatch : {
							game_name : item.name
						}
					}
				}, function(err, object){
					if(!err){
						if(object){
							return true;
						}	
						else{
							return false;
						}
					}
				});
				break;
			
			case "file" :

				files.findOne({
					user_id : user.id,
					user_email : user.email,
					user_files : {
						$elemMatch : {
							file_name : item.name
						}
					}
				}, function(err, object){

					if(!err){
						if(!object){
							module.exports.addNewFileEntry(connection, item, user, data, res)
						}
						else{
							data.returnData.signedRequest = null;
							res.status(200);
							res.write(JSON.stringify(data.returnData));
							return res.end();
						}
					}
				});
				break;

			case "gfile" : 

				games.findOne({
					user_id : user.id,
					user_email : user.email,
					user_games : {
						$elemMatch : {
							gfile_name : item.file.gfile_name
						}					
					}
				}, function(err, object){

					if(!err){
						if(object){
							return true;
						}	
						else{
							return false;
						}
					}		
				});
				break;

			default : 
				return false;
		}
	}

	/*
		Add the url of a newly uploaded file to the user's database document.

		@param {connection} connection - MongoDB connection object
		@param {object} item - the file being added/uploaded
		@param {user} user - user object
		@param {object} rData - request data for Amazon (includes objects used by S3 module)
		@param {res} res - HTTP Response object		
	*/
	module.exports.addNewFileEntry = function(connection, item, user, rData, res){

		let files = connection.collection("files");

		files.updateOne({	
				user_id : user.id, 
				user_email : user.email
			}, 
			{	
				$push : {
						user_files : {
							file_name : item.name,
							file_url : item.url,
							file_type : item.name.split('.').pop()
						}
					}
			}, function(err, result){
				if(err){
					console.log(err);
					res.status(500);
					return res.end();					
				}
				else{

					//We can upload the file to amazon now
					if(result){

					  	rData.s3.getSignedUrl('putObject', rData.s3Params, (err, data) => {
							if(err){
							  console.log(err);
							  res.status(200);
							  res.write("uploadErr");
							  return res.end();
							}
							else{
								rData.returnData.signedRequest = data;
								res.write(JSON.stringify(rData.returnData));
								res.status(200);
								return res.end();
							}
						});
					}
				}					
			}
		);
	}	

	/*
		Associate a new game with the user's account

		This involves creating a base game by adding 8 typescript files and 1 json config file

		@param {connection} connection - MongoDB connection object
		@param {string} name - game name
		@param {string} description - game description
		@param {string} imgURL - game image url
		@param {string} datetime - game creation datetime
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.addNewGame = function(connection, name, description, imgURL, datetime, user, res){

		let games = connection.collection("games");

		let existingGames;

		games.updateOne({	
				user_id : user.id, 
				user_email : user.email
			}, 
			{
				$push : {
						user_games : {
							game_name : name,
							game_description : description,
							game_imgURL : imgURL,
							game_lastUpdated : datetime,
							game_ID : null,
							game_files : []
						}
					}
			}, function(err, result){
				if(err){
					console.log(err);
					res.status(500);
					return res.end();					
				}
				else{
					
					/*

						==Important==

						When creating a new game, the base game template 
						is retrieved from the below path.
					*/
					let baseGameDir = "./library/basegame";

					fs.readdir(baseGameDir, (err, files) => {

						let directoryName;

						if(err){
							console.log(err);
						}
						else{

							//Get rid of .DS_Store if it's there
							if(files[0] == '.DS_Store'){
								files.splice(0,1);
							}

							/*
								Iterate over all the files in the base game directory, read them, 
								and add them to the game's entry in the database.
							*/
							async.eachSeries(
								
								files,

								function(obj, cb){

									fs.readFile(baseGameDir + "/" + obj, (err, data) => {
										if(err){
											console.log(err);
											res.write("base game error");
											res.status(200);
											return res.end();
										}
										else{
											module.exports.addNewGameFile(connection, name, {gfile_name : obj, gfile_contents : data.toString()}, user, res);
											cb(err);
										}
									});
								},

								//After all reads and database additions are done
								function(err){

									//TODO: Handle errors here..? Kinda useless since we already deal with them above
									console.log("Base game added");
								}
							);
						}
					});
				}
			}
		);	
	}

	/*
		Add a new game file to the database for a given game

		@param {connection} connection - MongoDB connection object
		@param {string} game_name - game name
		@param {object} file - game file object, including the name and contents
		@param {user} user - user object
		@param {res} res - HTTP Response object			
	*/
	module.exports.addNewGameFile = function(connection, game_name, file, user, res){

		let games = connection.collection("games");

		let existingGameFiles;

		games.findOne({
			user_id : user.id,
			user_email : user.email,
		}, function(err, object){

			if(!err){

				if(object !== null){

					let user_games = object.user_games;

					for (let i = 0; i < user_games.length; i++){

						if(user_games[i].game_name == game_name){

							games.updateOne({	
									user_id : user.id, 
									user_email : user.email,
									"user_games" : {
										$elemMatch : {game_name : game_name}
									}
								}, 
								{
									$push : {
										"user_games.$.game_files" : file
									}
								}, function(err, result){

									if(err){
										console.log(err);
										res.status(500);
									}
									else{
										res.status(200);
									}
							});
						}
					}
				}
				else{
					console.log("Null object");
					res.status(500);
				}
			}
			else{
				res.status(500);
			}
			return res.end();						
		});
	}

	/*
		Update the game files for a given game

		Will be used for saving and deleting game files. If the 'files' parameter is null, we are deleting
	
		@param {connection} connection - MongoDB connection object
		@param {string} game_name - game name
		@param {string} date - update datetime
		@param {object} files - files to be updated within the database
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.updateGameFiles = function(connection, game_name, date, files, user, res){

		let games = connection.collection("games");

		games.findOne({
			user_id : user.id,
			user_email : user.email,
		}, function(err, object){

			if(!err){

				let action;

				if(files){
					action = {
						$set : {
							"user_games.$.game_files" : files
						}
					}
				}
				else{
					action = {
						$pull: {
							user_games : {
								"game_name" : game_name
							}
						}
					}
				}				

				games.updateOne({	
					user_id : user.id, 
					user_email : user.email,
					"user_games" : {
						$elemMatch : {game_name : game_name}
					}
				}, 
				
				action
				
				, function(err, result){
					if(err){
						console.log(err);
						res.status(500);
					}
					else{
						res.status(200);
					}
				});				
			}
			else{
				res.status(500);
			}
			return res.end();						
		});
	}

	/*
		Update a project's settings, including the name, description, image, and date updated
	
		@param {connection} connection - MongoDB connection object
		@param {object} settings - game settings to update in the database
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.updateProjectSettings = function(connection, settings, user, res){

		let games = connection.collection("games");

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(!err){

				let updateObj = {};

				if(settings.name) updateObj["user_games.$.game_name"] = settings.name;
				if(settings.description) updateObj["user_games.$.game_description"]= settings.description;
				if(settings.imgURL) updateObj["user_games.$.game_imgURL"] = settings.imgURL;
				if(settings.dateTime) updateObj["user_games.$.game_lastUpdated"] = settings.dateTime;

				console.log(updateObj);
				games.updateOne({	
					user_id : user.id, 
					user_email : user.email,
					"user_games" : {
						$elemMatch : {game_name : settings.origName}
					}
				}, 
				
				{
					$set : updateObj
				}, 

				function(err, result){
					if(err){
						console.log(err);
						res.status(500);
					}
					else{
						res.status(200);
					}
				});
			}
			else{
				res.status(500);
			}
			return res.end();				
		});
	}

	/*
		Return the game files corresponding to the game name given

		@param {connection} connection - MongoDB connection object
		@param {string} game_name - game name
		@param {user} user - user object
		@param {res} res - HTTP Response object			
	*/
	module.exports.getGamefiles = function(connection, game_name, user, res){

		let games = connection.collection("games");

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(!err){
				if(object !== null){

					let user_games = object.user_games;

					for (let i = 0; i < user_games.length; i++){

						//We found our game
						if(user_games[i].game_name == game_name){
							if(user_games[i].game_files !== null){
								res.write(JSON.stringify(user_games[i].game_files));
								res.status(200);
								return res.end();
							}
							else{
								res.write("None");
								res.status(200);
								return res.end();
							}
						}
					}

					//The game does not exist
					res.write("None");
					res.status(200);
					return res.end();
				}
			}
			else{
				res.status(500);
			}
		});
	}

	/*
		Return the name, description, image URL, and lastUpdate date for every game
		in a user's account.

		@param {connection} connection - MongoDB connection object
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.getAllGames = function(connection, user, res){

		let games = connection.collection("games");
		let allGames = [];

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, item){
			if(!err){
				if(item !== null){
					let user_games = item.user_games;

					if(user_games != null){
						for (let i = 0; i < user_games.length; i++){
							allGames.push({
								game_name : user_games[i].game_name,
								game_description : user_games[i].game_description,
								game_imgURL : user_games[i].game_imgURL,
								game_lastUpdated : user_games[i].game_lastUpdated,
								game_ID : user_games[i].game_ID
							});
						}
						res.status(200);
						res.write(JSON.stringify(allGames));
					}
					else{
						res.write(JSON.stringify("No Games"));
					}
				}
			}
			else{
				res.status(500);
			}
			return res.end();
		});
	}

	/*
		Add the published game to the database of published games

		@param {connection} connection - MongoDB connection object
		@param {string} game_name - game name
		@param {string} contents - a published game's compiled javascript contents
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.publishGame = function(connection, game_name, contents, user, res) { 

		let published_games = connection.collection("published_games");

		published_games.findOne({
			game_name : game_name
		}, function(err, find_object){

			//Game has not been published
			if(find_object == null){

				let uniqueID = shorthash.unique(game_name + user.email);

				published_games.insert({
					game_name : game_name,
					game_ID : uniqueID,
					game_contents : contents
				}, function(err, insert_object){

					if(!err){
						
						let games = connection.collection("games");

						games.findOne({
							user_id : user.id,
							user_email : user.email
						}, function(err, object){

							if(!err){

								games.updateOne({	
									user_id : user.id, 
									user_email : user.email,
									"user_games" : {
										$elemMatch : {game_name : game_name}
									}
								}, 
								
								{
									$set : {
										"user_games.$.game_ID" : uniqueID
									}
								}, 

								function(err, result){
									if(err){
										console.log(err);
										res.status(200);
										res.write(JSON.stringify({
											error : 1
										}));
									}
									else{
										
										res.status(200);
										res.write(JSON.stringify({
											error : 0,
											game_ID : uniqueID
										}));
									}
									return res.end();
								});						
							}
							else{
								res.status(200);
								res.write(JSON.stringify({
									error : 1
								}));
								return res.end();
							}
						});
					}
					else{
						console.log(err);
						res.status(200);
						res.write(JSON.stringify({
							error : 1
						}));
						return res.end();
					}
				});
			}
			else{

				let uniqueID = find_object.game_ID;				

				published_games.updateOne({
					game_name : game_name
				}, 

				{
					$set : {
						game_contents : contents,
					}
				},

				function(err, update_object){

					if(!err){
						res.status(200);
						res.write(JSON.stringify({
							error : 0,
							game_ID : uniqueID
						}));							
					}
					else{
						res.status(200);
						res.write(JSON.stringify({
							error : 1
						}));
					}
					return res.end();				
				});
			}
		});
	}

	/*
		Get a published game's code from the database 

		@param {connection} connection - MongoDB connection object
		@param {string} game_ID - unique game ID
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.getPublishedGame = function(connection, game_ID, user, res){

		let published_games = connection.collection("published_games");

		published_games.findOne({
			game_ID : game_ID
		}, function(err, find_object){

			//Game found
			if(!err && find_object != null && find_object != undefined){
				res.write(JSON.stringify({
					error : 0,
					game_name : find_object.game_name,
					game_contents : find_object.game_contents
				}));
				res.status(200);
				return res.end();
			}

			//No game found
			else if(!err && find_object == null || find_object == undefined){
				res.write(JSON.stringify({
					error : 1,
					errorText : "Game not found. Please make sure the game is published."
				}));
				res.status(200);
				return res.end();
			}

			//Error
			else if(err){
				res.write(JSON.stringify({
					error : 1,
					errorText : "Error loading game. Please try again later."
				}));
				res.status(200);
				return res.end();
			}
		});
	}

	/*
		Get the URLs for all of a user's resource files

		@param {connection} connection - MongoDB connection object
		@param {user} user - user object
		@param {res} res - HTTP Response object	
	*/
	module.exports.getResourceFiles = function(connection, user, res){

		let files = connection.collection("files");

		files.find({
			user_id : user.id,
			user_email : user.email
		}).toArray(function(err, object){

			if(object[0].user_files != undefined && object[0].user_files != null){

				if(!err){ 

					res.write(JSON.stringify(object[0].user_files));
					res.status(200);
					return res.end();
				}
				else{
					res.write("none");
					res.status(200);
					return res.end();
				}
			}
			else{
				res.write("none");
				res.status(200);
				return res.end();
			}
		});
	}

}());