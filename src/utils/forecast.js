const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2a41e78e79fccc5f7a07249f875a826f&query=${latitude},${longtitude}`
    
    request({ url, json: true }, (error, { body } = {}) => {
        const { error: connectError, current } = body
        const { weather_descriptions, temperature, precip, humidity} = current

        if (error) {
            callback("Unable to connect.", undefined)
        } else if (connectError) {
            callback(connectError.info, undefined)
        } else {
            callback(undefined,{
                weather: weather_descriptions[0],
                temperature: temperature,
                precipitation: precip,
                humidity: humidity
            })
        }
    })
}


module.exports = { forecast }