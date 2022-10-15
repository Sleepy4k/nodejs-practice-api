var chalk = require("chalk")

// Get Config File
var { env, name } = require('../config/app')
var { system } = require('../config/path')

// Trait Response
var responseData = require(`../${system.trait}/responseData`)

// Repository Model
var userRepository = require(`../${system.repository}/UserRepository`)

// Main Module CRUD
module.exports = {
    /**
     * Display a listing of the resource.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array
     */
    index: (permintaan, respon) => {
        var users = userRepository.getUserData()

        if (users.length > 0) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: ${users}`));
            }

            return responseData.success(permintaan, respon, {
                data: users
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data masih kosong`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data masih kosong"
            })
        }
    },

    /**
     * Store a newly created resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array
     */
    store: (permintaan, respon) => {
        var form = permintaan.body
        var users = userRepository.getUserData()

        if (!form.urutan || !form.nama || !form.email) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Formulir urutan, nama dan email harus di isi"
            })
        }

        var duplicate = users.find((user) => user.urutan == form.urutan)
    
        if (duplicate) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Data id terduplikat"
            })
        } else {
            users.push(form)
        
            userRepository.saveUserData(users)
        
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil ditambahkan`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil ditambahkan",
                data: userRepository.getUserData()
            })
        }
    },
    
    /**
     * Display a specified resource.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    show: (permintaan, respon) => {
        var urutan = permintaan.params.id
        var isExist = userRepository.findUserData(urutan)

        if (isExist) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: ${isExist}`));
            }

            return responseData.success(permintaan, respon, {
                data: isExist
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }
    },
    
    /**
     * Update the specified resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    update: (permintaan, respon) => {
        var forms = permintaan.body
        var urutan = permintaan.params.id
        var users = userRepository.getUserData()
        var isExist = userRepository.findUserData(urutan)

        if (!isExist) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }

        if (forms.nama && forms.email) {
            urutan = urutan - 1

            users[urutan].nama = forms.nama
            users[urutan].email = forms.email
    
            userRepository.saveUserData(users)
    
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil diubah`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil diubah",
                data: users
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Formulir nama dan email harus di isi"
            })
        }
    },
    
    /**
     * Remove the specified resource from storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    destroy: (permintaan, respon) => {
        var urutan = permintaan.params.id
        var users = userRepository.getUserData()
        var usersToKepp = users.filter((user) => user.urutan != urutan)

        if (users.length > usersToKepp.length) {
            userRepository.saveUserData(usersToKepp)

            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil dihapus`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil dihapus",
                data: usersToKepp
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }
    },
}