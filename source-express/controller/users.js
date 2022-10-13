const fs = require('fs')

// Get Config
require('dotenv/config')

// Database Location
const userData = `./${process.env.DB_PATH}/users.json`

// Response Json Trait
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

function getUserData() {
    const jsonData = fs.readFileSync(userData)

    return JSON.parse(jsonData)
}

function saveUserData(body) {
    fs.writeFileSync(userData, JSON.stringify(body))

    return true
}

// Main Module CRUD
module.exports = {
    index: (permintaan, respon) => {
        if (getUserData().length > 0) {
            respon.json(responseData(permintaan, {
                data: getUserData()
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data masih kosong"
            }))
        }
    },
    store: (permintaan, respon) => {
        const object = getUserData()
    
        object.push(permintaan.body)
    
        saveUserData(object)
    
        respon.json(responseData(permintaan, {
            message: "Data berhasil ditambahkan",
            data: getUserData()
        }))
    },
    show: (permintaan, respon) => {
        const data = getUserData().find(user => user.urutan == permintaan.params.id);

        if (data) {
            respon.json(responseData(permintaan, {
                data: data
            }))
        } else {
            respon.json(responseData(permintaan, {
                message: "Data tidak ditemukan"
            }))
        }
    },
    update: (permintaan, respon) => {
        const urutan = permintaan.params.id
        const users = getUserData()

        if (!users.find(user => user.urutan == urutan)) {
            return respon.json(responseData(permintaan, {
                message: "Data tidak ditemukan"
            }))
        }

        const updatedUser = users.filter(user => user.urutan !== urutan)

        updatedUser.push(permintaan.body)

        saveUserData(updatedUser)

        respon.json(responseData(permintaan, {
            message: "Data berhasil diubah",
            data: getUserData()
        }))
    },
    delete: (permintaan, respon) => {
        const urutan = permintaan.params.id
        const users = getUserData()

        if (!users.find(user => user.urutan == urutan)) {
            return respon.json(responseData(permintaan, {
                message: "Data tidak ditemukan"
            }))
        }

        const data = users.filter( user => user.urutan !== urutan )
        
        saveUserData(data)

        respon.json(responseData(permintaan, {
            message: "Data berhasil dihapus",
            data: users
        }))
    },
}