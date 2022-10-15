var fs = require('fs')

// Const for config
var databasePath = process.env.DB_PATH || 'database'

// Database Location
var userData = `./${databasePath}/users.json`

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

    return body
}

// Read Database User File
function getUserData() {
    var dataBuffer = fs.readFileSync(userData)
    var dataJSON = dataBuffer.toString()

    return JSON.parse(dataJSON)
}

// Write Database User File
function saveUserData(body) {
    var stringifyData = JSON.stringify(body)
    fs.writeFileSync(userData, stringifyData)
}

// Main Module CRUD
module.exports = {
    /**
     * Display a listing of the resource.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array json
     */
    index: (permintaan, respon) => {
        var users = getUserData()

        if (users.length > 0) {
            respon.json(responseData(permintaan, {
                data: users
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data masih kosong"
            }))
        }
    },

    /**
     * Store a newly created resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array json
     */
    store: (permintaan, respon) => {
        var users = getUserData()
        var form = permintaan.body
        var duplicate = users.find((user) => user.urutan == form.urutan)
    
        if (!duplicate) {
            users.push(form)
    
            saveUserData(users)
        
            respon.json(responseData(permintaan, {
                message: "Data berhasil ditambahkan",
                data: getUserData()
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data id terduplikat"
            }))
        }
    },
    
    /**
     * Display a specified resource.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array json
     */
    show: (permintaan, respon) => {
        var users = getUserData()
        var urutan = permintaan.params.id
        var isExist = users.find((user) => user.urutan == urutan)

        if (isExist) {
            respon.json(responseData(permintaan, {
                data: isExist
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data tidak ditemukan"
            }))
        }
    },
    
    /**
     * Update the specified resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array json
     */
    update: (permintaan, respon) => {
        var users = getUserData()
        var forms = permintaan.body
        var urutan = permintaan.params.id - 1

        users[urutan].nama = forms.nama
        users[urutan].email = forms.email

        saveUserData(users)

        respon.json(responseData(permintaan, {
            message: "Data berhasil diubah",
            data: users
        }))
    },
    
    /**
     * Remove the specified resource from storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array json
     */
    delete: (permintaan, respon) => {
        var users = getUserData()
        var urutan = permintaan.params.id
        var usersToKepp = users.filter((user) => user.urutan != urutan)

        if (users.length > usersToKepp.length) {
            saveUserData(usersToKepp)

            respon.json(responseData(permintaan, {
                message: "Data berhasil dihapus",
                data: usersToKepp
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data tidak ditemukan"
            }))
        }
    },
}