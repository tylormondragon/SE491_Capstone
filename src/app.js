const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../Trip Planner');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/country-page', (req, res) => {
    res.render('country-page')
})

app.get('/about-us', (req, res) => {
    res.render('about-us')
})

app.get('/contacts', (req, res) => {
    res.render('contacts')
})

app.get('/city-page', (req, res) => {
    res.render('city-page')
})


app.get('/map', (req, res) => {
    res.render('map')
})

app.get('/details', (req, res) => {
    res.render('details')
})

app.get('/*', (req,res) => {
    res.render('404',{
    title:'404',
    error:'Page not found'
    })
})


//this make web server  listen to particular porte which is 3000
//and create callback() function which execute when we access the web server from client side
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('porte 3000 is open')
})