const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Epxress config
const publicDirectoryPath = path.join(__dirname, '../public') // generate path to public folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: '☀️ Weather App',
        name: 'Pierre Lenoble'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: '👋🏼 About',
        name: 'Pierre Lenoble'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: '🚑 Help',
        name: 'Pierre Lenoble',
        message: 'Do you need any help? This page is here for you!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecast,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.toto) {
        return res.send({
            error: 'You must provide a toto term.'
        })
    }

    console.log(req.query.toto)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oh nooo!',
        name: 'Pierre Lenoble',
        message: '4💣4 - Help article notre found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oh nooo!',
        name: 'Pierre Lenoble',
        message: '4💣4 - Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

