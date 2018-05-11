const request = require('request');
const express = require('express');
const bodyParser = required('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//webhook
app.post('/webhook', function(req, res) {
	console.log('received a post request');
	if (!req.body) return res.sendStatus(400);
});
