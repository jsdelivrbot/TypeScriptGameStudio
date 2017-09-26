//Require Modules
var express = require('express');
var aws = require('aws-sdk');

var app = express();
var path = require('path');
var database = require('./tsgs_modules/database');
var mongodb = require('mongodb');

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

//Database connection variable for use throughout the app
var connection;

//URI for database
var url = process.env.MONGOLAB_URI;
const S3_BUCKET = process.env.S3_BUCKET_NAME;
aws.config.region = "us-east-1";

/*
	Connect to database before initializing the app.
*/
mongodb.MongoClient.connect(url, function(err, db) {
	if(err){
		console.log("Error:" + err)
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
app.use(express.static(__dirname + '/views'));

app.get('/test', (req, res) => res.render('test.html'));

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: "typescript-game-studio",
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
  console.log("received");
  return;
});

