const request = require('request')

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
        + encodeURIComponent(location)
        + ".json?access_token=pk.eyJ1Ijoic25zc2h1bSIsImEiOiJjanRoaGxzN3IyZWc2NDRudW5jZmMwMGplIn0.fXc3psOi17di5PECNM1WNw"
    
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!',undefined)
        } else if (body.features.length === 0) {
            callback('Location is not found. Try another search.',undefined)
        } else {
            const center = body.features[0].center;
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode