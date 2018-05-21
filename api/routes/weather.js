const express = require('express');
const router  = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
//  if (!req.body) {
    res.status(200).json({
      message: 'Handling GET request to /weather'
    });
    res.setHeader('Content-Type', 'application/json');
    console.log(res);
    var city = 'New Delhi'; //req.body.queryResult.parameters['geo-city'];
    var w = getWeather(city);
    let response = "";
    let responseObj={
      "fulfillmentText": response,
      "fulfillmentMessages": [{"text": {"text": {w}}}],
      "source": ""
    }
//  }
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

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST request to /weather'
  });
});

module.exports = router;
