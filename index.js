//Require Modules
var express = require('express');
var app = express();
var path = require('path');
var database = require('./tsgs_modules/database')
var mongodb = require('mongodb')

//Database connection variable for use throughout the app
var connection;

//URL for database
var url = "mongodb://heroku_rjb68fzf:q6b65jumkk4nsp9kov6jrrrqha@ds129144.mlab.com:29144/heroku_rjb68fzf";

/*
	Connect to database before initializing the app.
*/
mongodb.MongoClient.connect(url, function(err, db) {
	if(err){
		console.log(err)
		process.exit(1);	
	}

	connection = db;
	console.log("We are connected to the database");

	var server = app.listen(process.env.PORT || 5000, function () {
    	var port = server.address().port;
    	console.log("App now running on port", port);
  	});

  	database.createNewCollection(connection, "test");
  	database.createNewDoc(connection, "test", {
  		_id: 1,
  		name: {first: "Max", last: "Hasselbusch"},
  		birth: new Date('Aug 17, 1995')
  	});
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/test'));

app.get('/', function(request, response) {
	response.sendFile(path.resolve('test/test.html'));
});

