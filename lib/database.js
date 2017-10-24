(function(){

	//Add a new collection to the database
	module.exports.createNewCollection = function(connection, name) {
		connection.createCollection(name, {strict : true}, function(err, collection) {
			if(err){
				console.log("Collection already exists,");
			}
			else{
				console.log("Successfully created collection");
			}
		});
	}

	//Add a new document to the database
	module.exports.createNewDoc = function(connection, collection_name, contents) {
		var collection = connection.collection(collection_name);	
		var doc = {contents};
		collection.insert(doc, function(err, results){
			if(err){
				console.log("Error creating document:\n", err);
			}
			else{
				console.log("Successfully created document");
			}
		});
	}

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

			//Submit the updated files to the database
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

	module.exports.addNewGameFile = function(connection, game_name, file, user, res){

		var games = connection.collection("games");

		var existingGameFiles;

		games.findOne({
			user_id : user.id,
			user_email : user.email,
			"user_games.game_name" : game_name
		}, function(err, object){

			if(object.game_files !== null){

				existingGamesFiles = object.game_files;
				existingGames.push(file);	
			}
			else{
				existingGameFiles = [
					file
				];
			}

			//Submit the updated files to the database
			games.updateOne({	
					user_id : user.id, 
					user_email : user.email,
					"user_games.game_name" : game_name
				}, 
				{
					$set : { 	
						game_files : existingGameFiles
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

	module.exports.updateGameFiles = function(connection, game_name, files, user, res){

		var games = connection.collection("games");

		var existingGames;

		games.findOne({
			user_id : user.id,
			user_email : user.email,
			"user_games.game_name" : game_name
		}, function(err, object){

			games.updateOne({	
					user_id : user.id, 
					user_email : user.email,
					"user_games.game_name" : game_name
				}, 
				{
					$set : { 	
						game_files : files
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

	module.exports.getGamefiles = function(connection, game_name, user, res){

		var games = connection.collection("games");

		games.find({
			user_id : user.id,
			user_email : user.email,
			"user_games.game_name" : game_name
		}, function(err, object){

			if(!err){
				if(object.game_files != null){
					res.write(JOSN.stringify(object.game_files));
					return res.end();
				}
				else{
					console.log(object, "\nno files");
					res.status(500);
    				return res.end();
				}
			}
			else{
				console.log(err);
				res.status(500);
				return res.end();
			}
		});
	}
}());