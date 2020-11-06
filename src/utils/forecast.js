const request = require('request')

    
    // 1. Setup the "forecast" function in utils/forecast.js
    // 2. Require the function in app.js and call it as shown below
    // 3. The forecast function should have three potential calls to callback:
    //    - Low level error, pass string for error
    //    - Coordinate error, pass string for error
    //    - Success, pass forecast string for data (same format as from before)

    const forecast = (La,Lo,callb) => {
        
        const url1 =`http://api.weatherstack.com/current?access_key=0b73b417d8d19b2f1e715bd8917099b2&query=${La},${Lo}`  
        request({url:url1, json:true}, (error,resp) => {

            if(error){
                callb('No Internet so cannot connect',undefined)
            }
            else if(resp.body.success === 'false' ){
                callb('HMM location either incomplete or doesnt exist',undefined)
            }
            else{ 
                const shorthnd = resp.body.current
                callb(undefined,
                    // also can be written like this or---->> 
                    // `  Weather is ${shorthnd.weather_descriptions[0]},
                    //                 Temperature is ${shorthnd.temperature}, 
                    //                 feels like ${shorthnd.feelslike},
                    //                 humidity is ${shorthnd.humidity}`
                
                //------>> be destructured like this too: 
                {     Temperature: shorthnd.temperature,
                    Feels_like: shorthnd.feelslike,
                    Chance_of_Rain: shorthnd.precip,
                    weatherD: shorthnd.weather_descriptions[0],
                    humidity:shorthnd.humidity
                 }
                
                )
             }
        })

    }

    


module.exports = forecast