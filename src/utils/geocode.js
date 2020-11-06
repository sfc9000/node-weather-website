const request = require ('request')
const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRhaTkwMDAiLCJhIjoiY2toMGI0MXFuMDhqbDJ0bzNqZGYzOG5wbiJ9.QBXbR1vk8PP3IhBbZFeb2g&limit=1'

    request({ url: url2, json: true }, (error, res) => {
        if (error) {
            callback("Connection Problem check your internet", undefined)
        }
        else if (res.body.features.length === 0) {
            callback("Wrong Address provided", undefined)
        }
        else {
            callback(undefined, {
                la: res.body.features[0].center[1],
                lo: res.body.features[0].center[0],
                loc: res.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode