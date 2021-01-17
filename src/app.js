const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { allowedNodeEnvironmentFlags } = require('process')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partilsDirectory = path.join(__dirname, '../templates/partials')

//setuo handlers
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partilsDirectory)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hellow World',
        name: 'Mihai Dragomir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Title'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Title'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('Provide an address')
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({error})
        }

        res.send({
            latitude,
            longitude,
            location,
            address: req.query.address
        })

        // forecast(latitude, longitude, (error, forecastData) => {
        //     if(error){
        //         return res.send({error})
        //     }

        //     req.send({
        //         forecast: forecastData,
        //         location,
        //         address: req.query.address
        //     })
        // })
    })

    // res.send({
    //     location: req.query.address,
    //     temp: '14'
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404'
    })
})

app.listen(port, () => {
    console.log('Server start : ' + port)
})