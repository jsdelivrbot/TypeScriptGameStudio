var express = require('express');
var app = express();
var path = require('path');
var databse = require('./tsgs-modules/database')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/test'));

app.get('/', function(request, response) {
	response.sendFile(path.resolve('test/test.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

database.connectToDB();