const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const searchLoc = search.value
    
    message1.textContent = 'Loading Please wait..'
    message2.textContent = ''
    
    fetch(`/weather?address=${searchLoc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) { message1.textContent = data.error  }
            else {  
                     message1.textContent = data.loc               
                    const { weatherD, Temperature, Chance_of_Rain, humidity, Feels_like } = data.Forecast;
                message2.textContent = `The Weather is ${weatherD}. It is ${Temperature} degrees Celcius, it feels like ${Feels_like}, the chance of raining is about ${Chance_of_Rain}%. With a humidity level of ${humidity}%`;
                   
                // 
                 }
        })
    })


})