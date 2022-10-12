const express = require('express')
const app = express()
const port = 3000

// List Route
const userRoute = require('./route/users')

app.get('/', (permintaan, respon) => {
    respon.send('Halo Dunia!')
})

app.use(userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})