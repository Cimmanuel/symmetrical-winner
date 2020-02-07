const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2ltbWFudWVsIiwiYSI6ImNrNjV2OTgyNzB1a2czaGwyeDZteWl3eXIifQ.e5JUneojyQM-pN5gz4iXhw&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if(body.features.length === 0) {
            callback('No match found. Try another query!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode