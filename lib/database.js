(function(){

	/*
		Checks to see if an account has already been added to the database
		If the account has been, nothing happens. If there is no record, we 
		add it.
	*/
	module.exports.addNewAccount = function(connection, contents) {

		var accounts = connection.collection("accounts");	
		var files = connection.collection("files");
		var games = connection.collection("games");

		var id = contents.id;
		var email = contents.email;
		var displayName = contents.email;

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
							user_files : null
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
									user_games : null
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
        		console.log("Did not add new account");
        	}
        });
	}

	/*
		Add the url of a newly uploaded file to the user's 
		database document.
	*/
	module.exports.addNewFileEntry = function(connection, name, url, user, res){

		var files = connection.collection("files");

		var existingFiles;

		//Get the existing files and push the new one into it
		files.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(object.user_files !== null){

				existingFiles = object.user_files;
				existingFiles.push({
					file_name : name,
					file_url : url
				});
			}
			else{
				existingFiles = [
					{
						file_name : name,
						file_url : url
					}
				];
			}

			//Submit the updated files to the database
			files.updateOne({	
					user_id : user.id, 
					user_email : user.email
				}, 
				{
					$set : { 	
						user_files : existingFiles
					}
			}, function(err, result){
				if(err){
					console.log(err);
					res.status(500);
					return res.end();					
				}
				else{
					res.status(200);
					return res.end();
				}
			});
		});
	}

	/*
		Associate a new game with the user's account

		For now, we'll just make the files object null. If at some point we decide
		to automatically create a new TS files when a game is created, we'll
		change the below insert query.
	*/
	module.exports.addNewGame = function(connection, name, description, imgURL, datetime, user, res){

		var games = connection.collection("games");

		var existingGames;

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(object.user_games !== null){

				existingGames = object.user_games;
				existingGames.push({
					game_name : name,
					game_description : description,
					game_imgURL : imgURL,
					game_lastUpdated : datetime,
					game_files : null
				});	
			}
			else{
				existingGames = [
					{
						game_name : name,
						game_description : description,
						game_imgURL : imgURL,
						game_lastUpdated : datetime,
						game_files : null
					}
				];
			}

			/*
				Submit the updated files to the database

				TODO: PREVENT DUPLICATE GAME NAME
			*/
			games.updateOne({	
					user_id : user.id, 
					user_email : user.email
				}, 
				{
					$set : { 	
						user_games : existingGames
					}
			}, function(err, result){
				if(err){
					console.log(err);
					res.status(500);
					return res.end();					
				}
				else{
					res.status(200);
					return res.end();
				}
			});
		});
	}

	/*
		Update the settings of a game. This includes the name, 
		description, and image
	*/
	module.exports.updateGameSettings = function(connection, name, new_name, description, imgURL, datetime, user, res){

		var games = connection.collection("games");

		var existingGames;

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){		

			console.log(object);
			/*
				Submit the updated files to the database

				TODO: PREVENT DUPLICATE GAME NAME
			*/
			games.updateOne({	
					user_id : user.id, 
					user_email : user.email,
					"user_games" : {
						$elemMatch : { game_name : name }
					}
				}, 
				{
					$set : { 	
						"user_games.$.game_name" : (new_name == undefined ? new_name : "user_games.$.game_name"),
						"user_games.$.game_description" : (description == undefined ? description : "user_games.$.game_description"),
						"user_games.$.game_imgURL" : (imgURL == undefined ? imgURL : "user_games.$.game_imgURL"),
						"user_games.$.game_lastUpdated" : (datetime == undefined ? imgURL : "user_games.$.game_imgURL")
					}
			}, function(err, result){
				if(err){
					console.log(err);
					res.status(500);
					return res.end();					
				}
				else{
					res.status(200);
					return res.end();
				}
			});
		});
	}

	/*
		Add a new game file to the database for a given game
	*/
	module.exports.addNewGameFile = function(connection, game_name, file, user, res){

		var games = connection.collection("games");

		var existingGameFiles;

		games.findOne({
			user_id : user.id,
			user_email : user.email,
		}, function(err, object){

			if(!err){
				if(object !== null){
					var user_games = object.user_games;
					for (var i = 0; i < user_games.length; i++){

						//We found our game
						if(user_games[i].game_name == game_name){

							if(user_games[i].game_files !== null){
								existingGameFiles = user_games[i].game_files
								existingGameFiles.push(file);	
							}
							else{
								existingGameFiles = [
									file
								];
							}

							games.updateOne({	
									user_id : user.id, 
									user_email : user.email,
									"user_games" : {
										$elemMatch : {game_name : game_name}
									}
								}, 
								{
									$set : { 	
										"user_games.$.game_files" : existingGameFiles
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
		Update (save) the game files for a given game
	*/
	module.exports.updateGameFiles = function(connection, game_name, date, files, user, res){

		var games = connection.collection("games");

		games.findOne({
			user_id : user.id,
			user_email : user.email,
		}, function(err, object){

			if(!err){
				if(object !== null){
					var user_games = object.user_games;
					for (var i = 0; i < user_games.length; i++){

						//We found our game
						if(user_games[i].game_name == game_name){

							games.updateOne({	
									user_id : user.id, 
									user_email : user.email,
									"user_games" : {
										$elemMatch : {game_name : game_name}
									}
								}, 
								{
									$set : { 	
										"user_games.$.game_lastUpdated" : date,									
										"user_games.$.game_files" : files
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
		Return the game files corresponding to the game name given
	*/
	module.exports.getGamefiles = function(connection, game_name, user, res){

		var games = connection.collection("games");

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, object){

			if(!err){
				if(object !== null){
					var user_games = object.user_games;
					for (var i = 0; i < user_games.length; i++){

						//We found our game
						if(user_games[i].game_name == game_name){
							if(user_games[i].game_files !== null){
								res.write(JSON.stringify(user_games[i].game_files));
								res.status(200);
								break;
							}
							else{
								res.write("None");
								res.status(200);
								break;
							}
						}
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
		Return the name, description, image URL, and lastUpdate date for every game
		in a user's account.
	*/
	module.exports.getAllGames = function(connection, user, res){

		var games = connection.collection("games");
		var allGames = [];

		games.findOne({
			user_id : user.id,
			user_email : user.email
		}, function(err, item){
			if(!err){
				if(item !== null){
					var user_games = item.user_games;

					if(user_games != null){
						for (var i = 0; i < user_games.length; i++){
							allGames.push({
							game_name : user_games[i].game_name,
							game_description : user_games[i].game_description,
							game_imgURL : user_games[i].game_imgURL,
							game_lastUpdated : user_games[i].game_lastUpdated
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
}());