'use strict';

let express = require('express');
let app = express();
let http = require('http');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let cors = require('cors');
let request = require('request');
let path = require('path');
let hostname = process.env.HOSTNAME || 'localhost';
let port = parseInt(process.env.PORT, 10) || 80;

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
