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

		var id = contents.id;
		var email = contents.email;
		var displayName = contents.email;

		//Check to see if the account already exists
		accounts.findOne({
			id : id,
        	email : email
  		}, function(err, object){
        	if(object == null){ 
				accounts.insert({
					id : id,
					email : email,
					displayName : displayName
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
							id : id,
							email : email,
							files : null
						}, function(err, results){
							if(err){
								console.log("Error adding files document:\n", err);
							}
							else{
								console.log("Successfully created files document");
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
	module.exports.addNewFileEntry = function(connection, name, url, user){

		var files = connection.collection("files");

		var existingFiles;

		//Get the existing files and push the new one into it
		files.findOne({
			id : user.id,
			email : user.email
		}, function(err, object){

			if(object.files !== null){

				existingFiles = [];
				existingFiles.push(object.files);
				existingFiles.push({
					name : name,
					url : url
				});
			}
			else{
				existingFiles = [
					{
						name : name,
						url : url
					}
				];
			}

			//Submit the updated files to the database
			files.updateOne({	
					id : user.id, 
					email : user.email
				}, 
				{
					$set : { 	
						files : existingFiles
					}
			}, function(err, result){
				if(err){
					console.log(err);
				}
			});
		});
	}
}());