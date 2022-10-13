const fs = require('fs')

// Database Location
const userData = `./${process.env.DB_PATH}/users.json`

// Response Json Trait
function responseData(permintaan, params) {
    var body = {
        status: params.status ? params.status : true,
        message: params.message,
        meta: {
            hostname: permintaan.hostname,
            method: permintaan.method,
            url: permintaan.url
        },
        data: params.data
    }

    return body;
}

// Read Database User File
function getUserData() {
    const jsonData = fs.readFileSync(userData)

    return JSON.parse(jsonData)
}

// Write Database User File
function saveUserData(body) {
    const stringifyData = JSON.stringify(body)
    fs.writeFileSync(userData, stringifyData)
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
        const form = permintaan.body
        const object = getUserData()
    
        if (object.find(user => user.urutan == form.urutan)) {
            return respon.json(responseData(permintaan, {
                status: false,
                message: "Data id terduplikat"
            }))
        }

        object.push(form)
    
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
                status: false,
                message: "Data tidak ditemukan"
            }))
        }
    },
    update: (permintaan, respon) => {
        const urutan = permintaan.params.id
        const users = getUserData()

        if (!users.find(user => user.urutan == urutan)) {
            return respon.json(responseData(permintaan, {
                status: false,
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
                status: false,
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