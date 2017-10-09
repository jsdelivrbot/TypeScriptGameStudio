/*============

  Module definitions

==============*/

//App modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Database modules
var database = require('./lib/database');
var mongodb = require('mongodb');

//Authentication modules
var passport = require('passport');
var auth = require('./lib/auth');
var session = require('express-session');

//Storage modules
var aws = require('aws-sdk');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//Database connection variable for use throughout the app
var connection;

//URI for database
const database_url = process.env.MONGOLAB_URI;

//S3 bucket name and region
const S3_BUCKET = process.env.S3_BUCKET_NAME;
aws.config.region = "us-east-1";

//Session configuration object for user authentication
var sessionConfig = {
  resave : false,
  saveUninitialized : false,
  secret: process.env.OAuth_Secret,
  signed: true,
};


// Authentication
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(auth.router);

/*============

	Connect to database before initializing the app.

==============*/
mongodb.MongoClient.connect(database_url, function(err, db) {

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
});

/*============
  
  Definitions for static html and js files to be used throughout the app.

==============*/


//Game engine library files
app.use(express.static(__dirname + '/library'));
app.use(express.static(__dirname + '/library/dependencyfiles'));

//Static html and javascript files for web pages
app.use(express.static(__dirname + '/website/js'));
app.use(express.static(__dirname + '/views'));

/*============
  
  Paths that return static html pages

==============*/

app.get('/test', (req, res) => res.render('test.html'));
app.get('/game', auth.required, (req, res) => res.render('game.html'));
app.get('/home', (req, res) => res.render('home.html'));
app.get('/login', (req, res) => res.render('login.html'));

/*============
  
  Server Endpoints

==============*/

/*
  Sign an Amazon S3 upload
*/
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: auth.extractProfile.email + '/' + fileName,
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

/*
  Upload text to the database
*/
app.post('/uploadToDatabase', function(req, res){  
    console.log(req.body.fileContents);
    database.createNewCollection(connection, "speed");
    database.createNewDoc(connection, "speed", {
      value: req.body.fileContents
    });
    res.status(200);
    res.json();
});

