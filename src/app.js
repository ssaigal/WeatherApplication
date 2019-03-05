const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectory = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static resources
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        name: 'Shalaka Aigal',
        title : 'Weather App'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title : 'About Page',
        name : 'Shalaka Aigal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        name : 'Shalaka Aigal',
        title : 'Help Page',
        message : 'Contact us on (123)-456-789'
    })
})


app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error : 'Address is mandatory'
        })
    }
    geocode(address, (error,{latitude, location, longitude} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error,forecastData) =>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast:forecastData
        })
    })
    /*res.send({
        location : 'San Francisco',
        forecast : 'Cloudy',
        address : req.query.address*/
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'Provide Search'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        name :'Shalaka Aigal',
        title : '404',
        errormessage : 'Help Page Not Found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        name :'Shalaka Aigal',
        title : '404',
        errormessage : '404 Page Not Found'
    })
})


app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})