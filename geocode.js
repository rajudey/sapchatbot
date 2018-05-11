const request = require('request');

var getAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);

  //request call
  request({
  	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&appid=a691ff3fd680fef69e34f4c897bbb2ae`,
  	json: true
  }, (err, res, body) => {
  	if (err)
  	{
      console.log('unable to connnect');
  	} else if (body.status === 'ZERO_RESULTS') {
  		console.log('address not found');
  	} else if (body.status === 'OK') {
  		console.log(`Address: ${body.results[0].formatted_address}`);
  		console.log(`Lat: ${body.results[0].geometry.location.lat}`);
  		console.log(`Lng: ${body.results[0].geometry.location.lng}`);
  	}
  });
}
module.exports.getAddress = getAddress
