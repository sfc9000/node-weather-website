const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoyPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../views-handlebars/views")
const partialsPath = path.join(__dirname,'../views-handlebars/partials')

//setup handlbars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoyPath))

app.get('', (req,res) => {
    res.render('index', {
        name: 'Adai',
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name:'Adai',
        title:'About Page'
    }) 
}) 

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Adai'
    })
})

app.get("/weather", (req,res)=> {

    if(!req.query.address){
        return res.send({
            error: "Please provide a search string!"
        })
        }
    else{
    
    geocode(req.query.address, (error, {la,lo,loc} = {}) => {
        if(error){
            return res.send({error:"Error, Please provide a correct address"})
        }
        forecast(la,lo,(error,forecastData) =>{
            if(error){
                return res.send({ error:"Error, Please provide a correct address"})
            }
            res.send({
                Forecast:forecastData,
                loc,
                address:req.query.address
            })

        })
    })
    
    
  
        }
})

app.get('/help/*',(req,res) => {
    res.render('404notfound',{
        message: 'This Help article not found!',    
        name: 'Adai'
    })
})

app.get('*', (req, res) => {
    res.render('404notfound', {
        message: 'Error 404: This Page doesnt exist',
        name: 'Adaii'
    })
})

app.listen(port,()=> {
    console.log("localhost is running now")
})