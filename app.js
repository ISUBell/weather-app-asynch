const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//Setup yargs to require an input, and force string type
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to retrieve weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


//pass in unformatted address to geocodeAddress, returns geocode in results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    //call weather.js to get current weather data
    weather.getWeather(results.latitude, results.longitude,  (errorMessage , weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It is currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
