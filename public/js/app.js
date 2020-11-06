console.log("Client side Javascript")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const searchLoc = search.value
    
    message1.textContent = 'Loading Please wait..'
    message2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${searchLoc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) { message1.textContent = data.error  }
            else {  
                     message1.textContent = data.loc               
                     const { weather, Temperature, Chance_of_Rain } = data.Forecast;
                     message2.textContent = `The Weather is   ${weather}. It is ${Temperature} degrees Celcius, with a ${Chance_of_Rain}% chance of rain.`;
                       /// message2.textContent = data.Forecast
                 }
        })
    })


})