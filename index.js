'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const line = require('@line/bot-sdk');

var config = {
	channelAccessToken: 'WEsLGM9gUc7vZWylP9w9IMNvQ+QP9/71bE3ettpEsQWWZxjSuUGPrIP1qAensHU9E3CfkrEsZM1BhKsL45xRIvq/W9V6tZ9gkhxSS20UG26vdn4Klt6yqbMkeoFb8Y8uXrhdwSOc+ujn/tsuX0s6ogdB04t89/1O/w1cDnyilFU=',
	channelSecret: '9daa6541856d2b012d4181eb199ccb06',
};

const client = new line.Client(config);

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post('/api/deposit', bodyParser.json(), (req, res) => {
	console.log('body', req.body);
	console.log('query', req.query);
	console.log(req.body.test);
	res.sendStatus(200);
});

app.post('/api/linehook', line.middleware(config), (req, res) => {
	console.log('post: /api/linehook');
	Promise
	.all(req.body.events.map(handleEvent))
	.then((result) => res.json(result));
});

function handleEvent(event) {
	console.log('event', event);
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	// create a echoing text message
	const echo = { type: 'text', text: event.message.text };

	console.log('event.message.text', event.message.text);
	// use reply API
	return client.replyMessage(event.replyToken, echo);
}

// listen on port
var port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
