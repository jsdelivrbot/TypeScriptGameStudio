var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/test'));

app.get('/', function(request, response) {
	response.sendFile(path.resolve('test/test.html'));
})
