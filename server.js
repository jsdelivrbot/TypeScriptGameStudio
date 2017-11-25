/*============

  Module definitions

==============*/

//App modules
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

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
  
  Paths for every web page

==============*/

app.get('/uploadtest', auth.required, (req, res) => res.render('test.html'));
app.get('/game', auth.required, (req, res) => res.render('game.html'));

app.get('/', (req, res) => res.render('index'));
app.get('/home', (req, res) => res.render('index'));
app.get('/account', auth.required, (req, res) => res.render('workspace'));
app.get('/editor', auth.required, (req, res) => res.render('editor'));
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
  if(req.user != undefined && fileName != undefined && fileType != undefined){

  	var url = "https://" + S3_BUCKET + ".s3.amazonaws.com/" + req.user.email + '/' + fileName;

	const s3Params = {
		Bucket: S3_BUCKET,
		Key: req.user.email + '/' + fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	};

	const returnData = {
      	signedRequest: null,
    	url: url
    };

	var data = {
		s3Params : s3Params,
		returnData : returnData,
		s3: s3
	}
	console.log(data);
	database.checkIfExists(connection, {name : fileName, url: url}, "file", req.user, data, res);
  }
  else{
    res.status(200);
    res.write("noLogin");
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
          if(object){
            res.write(JSON.stringify(object));
            res.status(200);
            res.end();
          }
          else{
            res.status(500);
            res.end();
          }
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
        if(object){
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
    if(!database.checkIfExists(connection, {name : req.body.game_name, file : req.body.file }, "gfile", req.user)){
      database.addNewGameFile(connection, req.body.game_name, req.body.file, req.user, res);
    }
    else{
      res.status(200);
      res.write("A file with this name already exists.");
      res.end();
    }
  }
});

/*
  Create a new game 

  TODO: LOAD THE DATABASE WITH THE 5 FILES NEEDED TO CREATE A GAME
*/  
app.post("/game/newGame", function(req, res){

  if(req.user){
    if(!database.checkIfExists(connection, {name : req.body.game_name}, "game", req.user)){
      database.addNewGame(connection, req.body.game_name, req.body.description, req.body.imgURL, req.body.datetime, req.user, res);
    }
    else{
      res.status(200);
      res.write("A project with this name already exists");
      res.end();
    }
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

/*
  Send a game's files off for compilation on the build server. 

  We should send the ID and email of the user along with the request. They will be
  checked on the other end.
*/
app.post("/game/compile", function(req, res){

  if(req.user){
  	//console.log(req.body);
    compile(req, res, function(data){
		//console.log(data);
		res.write(data);
		res.status(200);
		res.end();
    });
  }
});

/*
  Send a game's files off for compilation on the build server and then publish the game for public access.

  Return game URL to user
*/
app.post("/game/publish", function(req, res){

  if(req.user){

  	//console.log(req.body);
  	compile(req, res, function(data){

  		//Publish the game and return the url to the user

  		//console.log(data);
		res.write(data);
		res.status(200);
		res.end();
  	});
  }
});

/*============
  
  Server Functions

==============*/

function compile(req, res, callback){

    var postData = {
      email : req.user.email,
      id : req.user.id,
      game_name : req.body.game_name,
      contents : req.body.contents
    };

    //console.log(JSON.stringify(postData));

    /*
    var options = {
      hostname : "localhost",
      port : 5001,
      path : "/compile",
      method : "POST",
      headers : {
         'Content-Type' : 'application/json',
         'Content-Length' : Buffer.byteLength(JSON.stringify(postData)) 
      }
    };
	*/

    var options = {
      hostname : "typescript-game-studio-build.herokuapp.com",
      path : "/compile",
      method : "POST",
      headers : {
         'Content-Type' : 'application/json',
         'Content-Length' : Buffer.byteLength(JSON.stringify(postData)) 
      }
    };

	var req = http.request(options, (response) => {

	  	var data = '';

	  	console.log('statusCode: ', response.statusCode);

	  	response.on('data', (d) => {
	    	data += d;
	  	});

		response.on('end', () => {
			callback(data);
		});

	});

	req.write(JSON.stringify(postData));
	req.end();
}
