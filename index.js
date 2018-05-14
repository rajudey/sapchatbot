const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());
restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
/*
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//webhook
app.get('/webhook', function(req, res) {
	console.log('received a post request');
	if (!req.body) return res.sendStatus(400)
	res.setHeader('Content-Type', 'application/json');
	console.log('here is the post request from dialogflow');
	console.log(req.body);
	console.log('got geo city parameter from Dialogflow' + req.body.queryResult.parameters['geo-city']);
	var city = req.body.queryResult.parameters['geo-city'];
	var w = getWeather(city);
	let response = "";
	let responseObj={
		"fulfillmentText": response,
		"fulfillmentMessages": [{"text": {"text": {w}}}],
		"source": ""
	}
	//
	console.log('Here is the response to dialogflow');
	console.log(responseObj);
	return res.json(responseObj);
});

var result="";

function cb(err, response, body) {
	if(err){
		console.log('error', error);
	}
	var weather = JSON.parse(body);
	if (weather.message === 'city not found') {
		result = 'Unable to get weather ' + weather.message;
	}
	else {
		result = 'Right now its ' + weather.main.temp + ' degree with ' + weather.weather[0].description;
	}
}

function getWeather(city) {
	result = undefined;
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a691ff3fd680fef69e34f4c897bbb2ae`;
	console.log(url);
	var req = request(url, cb);
	while(result === undefined) {
		require('deasync').runLoopOnce();
	}
	return result;
}
*/
