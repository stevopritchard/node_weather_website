const path = require('path');
const express = require('express');
const hbs = require('hbs');


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const PORT = process.env.PORT || 3000

//Define paths for Express configuration
const pubDirName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //this is to demonstrate how to reference handlbar files in a folder that is 
//not named 'views' which is the default that express looks for
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //using the directory path referenced above, we can use app.set 
//to tell express to look for the handlebar files in a different path
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubDirName))


const name = 'Kertmit the Frog'

app.get('', (req, res) => {
    res.render('index', {
        title: `Weather App `,
        name
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        time: new Date(),
        name
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'must provide address'
        })
    }
    geocode.geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({ error })
        } //this is here to prevent forecast from running if not viable data is passed from geocode
        if(error){
            return res.send({Geocode_error: error})
        }
        console.log('Geocode_coords: ', latitude, longtitude)

        // const { latitude, longtitude } = data

        forecast.forecast(latitude, longtitude, (error, data) => {
            if(error) { return res.send({Forecast_error: error}) }
            res.send({
                Forecast_data: data,
                location
            })
        })
    })
})

//will match ANY page referenced within help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page not found',
        name
    })
})

//NOTE: the wildcard char means 'match anything not referenced so far'
//this declaration MUST come after the page-spefic routes
app.get('*', (req, res) => { 
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name
    })
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})