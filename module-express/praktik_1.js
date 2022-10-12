const express = require('express')
const app = express()
const port = 3000

// Main Web Route
app.get('/', (permintaan, respon) => {
    respon.send('Halo Dunia!')
})

// Listen Web
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})