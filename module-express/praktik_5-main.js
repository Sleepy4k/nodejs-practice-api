const express = require('express')
const app = express()
const port = 3000

// List Route
const users = require('./route/users')

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
    console.log(`Example app listening on port ${port}`)
})