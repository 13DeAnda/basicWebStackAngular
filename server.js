var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname + '/app')));
app.get('/', function(req, res) {
	res.sendfile('app/index.html');
});

module.exports = app;