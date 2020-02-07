const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express configuraion
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Caspian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather ',
        name: 'Caspian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Help',
        name: 'Caspian',
        message: 'This is a typical help message.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
           return res.send({
               error: error
           }) 
        }
        forecast(latitude, longitude, (error, forecastData) =>  {
            if(error) {
                return res.send({
                    error: error
                })     
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Error',
        name: 'Caspian',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Error',
        name: 'Caspian',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000.')
})
