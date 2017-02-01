const request = require('request');

var geocodeAddress = (address, callback) => {

  //encode the address to remove spaces, etc for entering into the http request
  var addressEncoded = encodeURIComponent(address);

  request({
    //We are using google maps api to get lat and long data
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find given address');
    } else if (body.status === 'OK') {
      //undefined is used here to avoid passing an error on the callback
      //to app.js
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      })
    }
  });
};

module.exports = {
  geocodeAddress,
};
