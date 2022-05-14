const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2a41e78e79fccc5f7a07249f875a826f&query=${latitude},${longtitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    const { error: connectError, current, location } = body;
    const {
      weather_descriptions,
      temperature,
      wind_speed,
      humidity,
      weather_icons,
    } = current;

    const { name, localtime } = location;

    if (error) {
      callback("Unable to connect.", undefined);
    } else if (connectError) {
      callback(connectError.info, undefined);
    } else {
      callback(undefined, {
        weather: weather_descriptions[0],
        temperature: temperature,
        windSpeed: wind_speed,
        humidity: humidity,
        icon: weather_icons,
        localtime: localtime,
      });
    }
  });
};

module.exports = { forecast };
