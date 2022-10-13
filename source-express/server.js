const express = require('express')
const app = express()

// Get Config File
require('dotenv/config')

// List Route
const users = require(`./${process.env.PATH_ROUTER}/users`)

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
app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`)
})