/*============

  Module definitions

==============*/

//App modules
var express = require('express');
var app = module.exports = express();
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

//Set up a few misc. usages for the app
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Database connection variable for use throughout the app
var connection;

//URI for database
const database_url = process.env.MONGOLAB_URI;

//S3 bucket name and region
const S3_BUCKET = process.env.S3_BUCKET_NAME;7
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

  //Export the database connection and the database module for use throughout the app
  module.exports.connection = connection;
  module.exports.database = database;

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
app.use('/images', express.static(__dirname + '/library/images'));

//Static html and javascript files for web pages
app.use(express.static(__dirname + '/views'));

app.use('/js', express.static(__dirname + '/website/js'));
app.use('/css', express.static(__dirname + '/website/css')); // redirect CSS bootstrap
app.use('/images', express.static(__dirname + '/website/images')); // redirect CSS bootstrap

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); //redirect popper.js
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

/*============
  
  Paths that return static html pages

==============*/

app.get('/uploadtest', auth.required, (req, res) => res.render('test.html'));
app.get('/game', auth.required, (req, res) => res.render('game.html'));

app.get('/', (req, res) => res.render('index'));
app.get('/home', (req, res) => res.render('index'));
app.get('/account', auth.required, (req, res) => res.render('workspace'));
app.get('/editor', (req, res) => res.render('editor'));
app.get('/template', (req, res) => res.render('template'));

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

  //Make sure the user is logged in
  if(req.user != undefined){

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: req.user.email + '/' + fileName,
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
          url: "https://" + S3_BUCKET + ".s3.amazonaws.com/" + req.user.email + '/' + fileName
        };

        /*
          Add the new file to the user's list of files in the 
          database
        */

        database.addNewFileEntry(connection, fileName, 
          "https://" + S3_BUCKET + ".s3.amazonaws.com/" + req.user.email + '/' + fileName, req.user);
        res.write(JSON.stringify(returnData));
        res.end();
      });
  }
  else{
    res.status(500);
    return res.end();
  }
  
});

/*
  Retrieve account data (ID, email, displayName)
*/
app.get("/account/data", function(req, res){

  if(req.user){
      connection.collection('accounts').findOne({
        user_id : req.user.id,
        user_email : req.user.email
      }, function(err, object){
        if(!err){ 
          res.write(JSON.stringify(object));
          res.status(200);
          res.end();
        }
        else{
          res.status(500);
          res.end();
        }
      });
  }
});

/*
  Retrieve account files uploaded to Amazon
*/  
app.get("/account/files", function(req, res){

  if(req.user){
      connection.collection('files').find({
        user_id : req.user.id,
        user_email : req.user.email
      }).toArray(function(err, object){
        if(object != null){
          if(!err){ 
            console.log(object);
            res.write(JSON.stringify(object[0].files));
            res.status(200);
            res.end();
          }
          else{
            res.status(500);
            res.end();
          }
        }
      });
  }
});

app.post("/account/verify", function(req, res){

  if(req.user){
    res.status(200);
  }
  else{
    res.status(500);
  }
  res.end();
});

/*
  Update a game's files
*/  
app.post("/game/updateGameFiles", function(req, res){

  if(req.user){
    database.updateGameFiles(connection, req.body.game_name, req.body.files, req.user, res);
  }
});

app.post("/game/addNewGameFile", function(req, res){

  if(req.user){
    database.addNewGameFile(connection, req.body.game_name, req.file, req.user, res);
  }
});

/*
  Create a new game 
*/  
app.post("/game/newGame", function(req, res){

  if(req.user){
    database.addNewGame(connection, req.body.game_name, req.body.description, req.body.imgURL, req.body.datetime, req.user, res);
  }
});

/*
  Retrieve all of a game's files
*/
app.get("/game/getGame", function(req, res){

  if(req.user){
    database.getGamefiles(connection, req.query['game_name'], req.user, res);  
  }
});

/*
  Retrieve the metadata for all the games
*/
app.get("/game/allGames", function(req, res){
  if(req.user){
    database.getAllGames(connection, req.user, res);  
  }
});