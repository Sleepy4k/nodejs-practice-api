const express = require('express')
const router = express.Router()

router.get('/users', (permintaan, respon) => {
    respon.send('Mendapatkan data semua pengguna')
})

router.post('/user', (permintaan, respon) => {
    respon.send('Mendapat permintaan posting')
})

router.put('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan put di /user')
})

router.delete('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan penghapusan di /pengguna')
})

module.exports = router