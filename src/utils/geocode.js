const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2hhbGFrYWFpZ2FsIiwiYSI6ImNqc3N1MXgxMjBha2Q0YXBnbDNqajJsNGUifQ.1NrEqLLCaBuPT7dXJWEDbQ&limit=1'
    request({ url, json: true}, (error,{body}=response) => {
        if(error){
            callback('Unable to connect to WeatherApp',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
             
            callback(undefined,
            {latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode