(function(){

	module.exports.connectToDB = function() {
		var MongoClient = require('mongodb').MongoClient;

		MongoClient.connect("mongodb://heroku_rjb68fzf:q6b65jumkk4nsp9kov6jrrrqha@ds129144.mlab.com:29144/heroku_rjb68fzf", function(err, db) {
			if(!err){
				console.log("We are connected");
			}
		})
	}
}());