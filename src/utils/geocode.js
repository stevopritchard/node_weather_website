const request = require('postman-request');
const mapboxAPIKey = 'pk.eyJ1IjoidGlwb2RlaWNlYmVyZyIsImEiOiJja2Y3ejRtMDEwNzR3MnNvaGs2YXN4ZjB0In0.uAusX9FPywzZ3kUwY3U3aw'

const geocode = (addressEncoded, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressEncoded)}.json?access_token=${mapboxAPIKey}&limit=1`

    request({ url, json: true}, (error, { body } = {}) => {

        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (body.message || body.features.length == 0) {
            callback("Try again with different search term", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = { geocode }