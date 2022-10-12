const express = require('express')
const app = express()
const port = 3000

app.get('/', (permintaan, respon) => {
    respon.send('Halo Dunia!')
})

app.get('/users', (permintaan, respon) => {
    respon.send('Mendapatkan data semua pengguna')
})

app.post('/user', (permintaan, respon) => {
    respon.send('Mendapat permintaan posting')
})

app.put('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan put di /user')
})

app.delete('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan penghapusan di /pengguna')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})