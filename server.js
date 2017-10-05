//Require Modules
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var database = require('./tsgs_modules/database');
var mongodb = require('mongodb');
var formidable = require('formidable');
var passport = require('passport');
var session = require('express-session');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//Database connection variable for use throughout the app
var connection;

//URI for database
var url = process.env.MONGOLAB_URI;
const S3_BUCKET = process.env.S3_BUCKET_NAME;
aws.config.region = "us-east-1";

var sessionConfig = {
  resave : false,
  saveUninitialized : false,
  secret: process.env.OAuth_Secret,
  signed: true,
};

app.use(session(sessionConfig));

// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./lib/auth').router);

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

    /*
  	database.createNewCollection(connection, "test");
  	database.createNewDoc(connection, "test", {
  		_id: 1,
  		name: {first: "Max", last: "Hasselbusch"},
  		birth: new Date('Aug 17, 1995')
  	});
    */
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/library'));
app.use(express.static(__dirname + '/library/dependencyfiles'));
app.use(express.static(__dirname + '/website/js'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/test', (req, res) => res.render('test.html'));
app.get('/game', (req, res) => res.render('game.html'));
app.get('/home', (req, res) => res.render('home.html'));
app.get('/login', (req, res) => res.render('login.html'));

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
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

app.post('/uploadToDatabase', function(req, res){  
    console.log(req.body.fileContents);
    database.createNewCollection(connection, "speed");
    database.createNewDoc(connection, "speed", {
      value: req.body.fileContents
    });
    res.status(200);
    res.json();
});
/*
app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
  console.log("received");
  return;
});
*/

