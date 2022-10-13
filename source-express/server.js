const bodyParser = require("body-parser")
const express = require('express')
const app = express()

// Get Config File
require('dotenv/config')
const name = process.env.APP_NAME
const port = process.env.APP_PORT

// List Route
const users = require(`./${process.env.PATH_ROUTER}/users`)

// Read Form Request
app.use(bodyParser.json())

// Read Encode Form Request
app.use(bodyParser.urlencoded({ extended: true }))

// Main Web Route
app.get('/', (permintaan, respon) => {
    respon.send('Halo Dunia!')
})

app.use(users)

// Listen Web
app.listen(port, () => {
    console.log(`${name} listening on port ${port}`)
})