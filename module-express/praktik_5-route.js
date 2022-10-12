const express = require('express')
const router = express.Router()

const userData = [
    {urutan: 1, nama: "Benjamin4k", email: "sarahpalastrin@gmail.com"},
    {urutan: 2, nama: "Apri Pandu", email: "3103120028@student.smktelkom-pwt.sch.id"},
];

router.get('/users', (permintaan, respon) => {
    respon.json(userData)
})

router.post('/user', (permintaan, respon) => {
    userData.push(permintaan.body)
    respon.json(userData)
})

router.put('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan put di /user')
})

router.delete('/user/:id', (permintaan, respon) => {
    respon.send('Mendapat permintaan penghapusan di /pengguna')
})

module.exports = router