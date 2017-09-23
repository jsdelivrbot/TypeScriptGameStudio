(function(){

	//Add a new collection to the database
	module.exports.createNewCollection = function(connection, name) {
		connection.createCollection(name, {strict	:true}, function(err, collection) {
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
}());