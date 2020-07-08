const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9d92c0575edf2d21a08a958f1f23495f&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast