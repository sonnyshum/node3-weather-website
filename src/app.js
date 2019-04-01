const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT || 3000

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for serve
app.use(express.static(publicDirectoryPath))

const author = "Homer Simpson"

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        author: author
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        author: author
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Weather forcasting App',
        author: author
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address term"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forcast(latitude, longitude, (error, {summary, temperature, precipProbability}) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    const longForcast = "The forcast for " + location + " is " + summary +
                        "The current temperature is " + temperature + " degrees with a " +
                        precipProbability + "% chance of rain."
                    res.send({
                        forcast: summary,
                        location: location,
                        temperature: temperature,
                        precipitation: precipProbability,
                        longForcast: longForcast
                    })
                }
            })
        }
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error',
        author: author,
        message: 'No such help article.'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error',
        author: author,
        message: 'Page not found.'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

app.listen(port, () => {
    console.log('Server is up on port '+port)
})