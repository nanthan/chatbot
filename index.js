'use strict';

var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cors = require('cors');
var request = require('request');
var path = require('path');
var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(process.env.PORT, 10) || 80;

// app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler({
	dumpExceptions: true,
	showStack: true
}));


app.get("/", function (req, res) {
	console.log('hostname', hostname);
	console.log('port', port);
	res.sendStatus(200);
});

http.createServer(app).listen(80, function(){
	console.log("Server running on http://%s:%s", hostname, port);
});
