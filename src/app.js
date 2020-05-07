const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../Trip Planner')

app.use(express.static(publicDirectoryPath))

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/map', (req, res) => {
    res.render('map')
})

//this make web server  listen to particular porte which is 3000
//and create callback() function which execute when we access the web server from client side
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('porte 3000 is open')
})