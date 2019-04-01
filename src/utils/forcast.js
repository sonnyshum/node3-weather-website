const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/58f58d10c8e91fb02ddcff29ca077cd2/"
            + latitude + ',' + longitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connecto to weather service.")
        } else if (body.error) {
            callback("Unable to find location. Try again.")
        } else {
            callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipProbability: body.currently.precipProbability * 100
                })
        }
    })
}

module.exports = forcast