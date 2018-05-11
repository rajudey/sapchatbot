const http    = require('http');
const express = require('express');
const yargs   = require('yargs');
const app     = express();
const geocode = require('./geocode.js');
const request = require('request');

const argv = yargs
.options({
	a: {
		alias: 'address',
		demand: true,
		describe: 'Address to fetch weather',
		string: true
	},
	b: {
		alias: 'city',
		string: true
	}
})
.help()
.alias('help', 'h')
.argv;

console.log(argv.a, argv.b);
//geocode.getAddress(argv.a);

var encodedAddress = encodeURIComponent(argv.a);
request({
	url: `http://api.openweathermap.org/data/2.5/weather?q=${encodedAddress}&appid=a691ff3fd680fef69e34f4c897bbb2ae`,
	json: true
}, (err, res, body) => {
  console.log(`${body.clouds.all}`);
});




/*var url = 'http://api.openweathermap.org/data/2.5/weather?q=New%20Delhi,IN&appid=a691ff3fd680fef69e34f4c897bbb2ae';*/

/* webhook */
/*
app.get('/', (req,res) => {
		console.log('received a post request');


	if (!req.body) return res.sendStatus(400);
	res.setHeader('Content-Type', 'application/json');
	console.log('here is the post request from dialogflow');
	console.log('Got get city parameter from dialogflow ' + req.body.queryResult.parameters['geo-city']);
	var city = req.body.queryResult.parameters['geo-city'];

	city = 'New Delhi';
	var w    = getWeather(city);
	let response = ' ';
	let responseObj = {
		"fulfillmentText": response,
		"fulfillmentMessages": [{"text": {"text": {w}}}],
		"source": ""
	}
	console.log('here is the response to dialogflow');
	console.log(responseObj);
	return res.json(responseObj);

});

app.listen(3000, () => console.log('listening on port 3000'));
*/

/*
var result = '';

function cb(err, res, body) {
	if(err) {
		console.log('error', error);
	}
	var weather = JSON.parse(body);
	if (weather.message === 'city not found') {
		result = 'unable to get weather ' + weather.message;
	} else {
		result = 'Right now its ' + weather.main.temp + ' degree with ' + weather.weather[ ].description;
	}
}

function getWeather(city) {
	result = undefined;
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=(city)&units=imperial&appid=a691ff3fd680fef69e34f4c897bbb2ae';
	console.log(url);
	var req = request(url, cb);
	while (result === undefined) {
		require('deasync').runLoopOnce();
	}
	return result;
}
*/
