var chalk = require("chalk")

// Get Config File
var { env, name } = require('../../../config/app')
var { system } = require('../../../config/path')

// Trait Response
var responseData = require(`../../${system.trait}/responseData`)

// Repository Model
var userRepository = require(`../../${system.repository}/UserRepository`)

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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', JSON.stringify(users)))))
            }

            return responseData.success(permintaan, respon, {
                data: users
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.empty')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.empty')
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
            var error = []

            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            if (!form.urutan) {
                error.push(respon.__('validation.required', 'urutan'))
            }

            if (!form.nama) {
                error.push(respon.__('validation.required', 'nama'))
            }

            if (!form.email) {
                error.push(respon.__('validation.required', 'email'))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: error
            })
        }

        var duplicate = users.find((user) => user.urutan == form.urutan)
    
        if (duplicate) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: respon.__('data.duplicate')
            })
        } else {
            users.push(form)
        
            userRepository.saveUserData(users)
        
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.add'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.add')),
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', JSON.stringify(isExist)))))
            }

            return responseData.success(permintaan, respon, {
                data: isExist
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            })
        }

        if (forms.nama && forms.email) {
            urutan = urutan - 1

            users[urutan].nama = forms.nama
            users[urutan].email = forms.email
    
            userRepository.saveUserData(users)
    
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.change'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.change')),
                data: users
            })
        } else {
            var error = []

            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            if (!form.nama) {
                error.push(respon.__('validation.required', 'nama'))
            }

            if (!form.email) {
                error.push(respon.__('validation.required', 'email'))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: error
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.delete'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.delete')),
                data: usersToKepp
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            })
        }
    },
}