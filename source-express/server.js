var express = require('express')
var app = express()

// Get Config File
require('dotenv/config')

// data for config
var name = process.env.APP_NAME || 'Express'
var port = process.env.APP_PORT || '3000'
var routePath = process.env.PATH_ROUTER || 'routes'

// List Route
var users = require(`./${routePath}/users`)

// Read Form Request
app.use(express.json())

// Read Encode Form Request
app.use(express.urlencoded({ extended: true }))

// Main Web Route
app.get('/', (permintaan, respon) => {
    respon.send('Halo Dunia!')
})

app.use(users)

// Listen Web
app.listen(port, () => {
    console.log(`${name} listening on port ${port}`)
})