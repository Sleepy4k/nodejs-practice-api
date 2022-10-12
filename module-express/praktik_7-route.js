const express = require('express')
const router = express.Router()

let userData = [
    {urutan: 1, nama: "Benjamin4k", email: "sarahpalastrin@gmail.com"},
    {urutan: 2, nama: "Apri Pandu", email: "3103120028@student.smktelkom-pwt.sch.id"},
];

function responseData(permintaan, params) {
    var body = {
        status: params.status ? params.status : true,
        message: params.message,
        data: params.data,
        method: permintaan.method,
        url: permintaan.url
    }

    return body;
}

router.get('/users', (permintaan, respon) => {
    if (userData.length > 0) {
        respon.json(responseData(permintaan, {
            data: userData
        }))
    } else {
        respon.json(responseData(permintaan, {
            status: false,
            message: "Data masih kosong"
        }))
    }
})

router.post('/user', (permintaan, respon) => {
    userData.push(permintaan.body)
    
    respon.json(responseData(permintaan, {
        message: "Data berhasil ditambahkan",
        data: userData
    }))
})

router.put('/user/:id', (permintaan, respon) => {
    const id = permintaan.params.id

    userData.filter(user => {
        if (user.id == id) {
            user.nama = permintaan.body.nama
            user.email = permintaan.body.email

            return user
        }
    })
    
    respon.json(responseData(permintaan, {
        message: "Data berhasil diubah",
        data: userData
    }))
})

router.delete('/user/:id', (permintaan, respon) => {
    const id = permintaan.params.id

    users = userData.filter(user => user.id != id)

    respon.json(responseData(permintaan, {
        message: "Data berhasil dihapus",
        data: users
    }))
})

module.exports = router