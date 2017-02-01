const request = require('request');

var getWeather = (lat, long, callback) => {
  request({
    //weather provided via the dark sky api
    url: `https://api.darksky.net/forecast/211d2867670655df792d3c424a9ed595/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    //status code 200 means everything went as planned
    if (!error && response.statusCode === 200) {
      //undefined is used to reserve a spot for the error message
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to get weather');
    }
  });
}

module.exports.getWeather = getWeather;


// 211d2867670655df792d3c424a9ed595
