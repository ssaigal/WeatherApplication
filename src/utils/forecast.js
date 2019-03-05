const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a57c6aa55cf276e4905b19d44ffafee4/'+latitude+','+longitude
    request({url, json:true},(error,{body}=response)=> {
        if(error){
            callback('Unble to connect to Weatherapp', undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,
                body.daily.data[0].summary + ' and the temperature will be ' +body.currently.temperature +
                 '. The chances of rain is ' +body.currently.precipProbability + '%'
                
            )
        }
    })
}

module.exports = forecast