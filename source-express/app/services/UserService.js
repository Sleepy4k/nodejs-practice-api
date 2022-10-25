// Get Config File
var { system } = require('../../config/path')
var database = require('../../config/database')

// Traits
var print = require(`../${system.trait}/consoleLogger`)
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
    index: async (permintaan, respon) => {
        try {
            var users = await userRepository.getUserData()

            if (users.length <= 0) {
                print.info(respon.__('data.empty'))
                print.debug('request from client to get user data success but empty')

                return responseData.error(permintaan, respon, {
                    message: respon.__('data.empty')
                })
            } else {
                print.info(JSON.stringify(users))
                print.debug('request from client to get user data success')

                return responseData.success(permintaan, respon, {
                    data: users
                })
            }
        } catch (error) {
            return responseData.error(permintaan, respon, {
                error: error.message
            }, 500)
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
    store: async (permintaan, respon) => {
        var form = permintaan.body

        try {
            if (database.default == 'file') {
                var users = userRepository.getUserData()
    
                if (!form.urutan || !form.nama || !form.email) {
                    var error = []
    
                    if (!form.urutan) {
                        error.push(respon.__('validation.required', 'urutan'))
                    }
    
                    if (!form.nama) {
                        error.push(respon.__('validation.required', 'nama'))
                    }
    
                    if (!form.email) {
                        error.push(respon.__('validation.required', 'email'))
                    }
    
                    print.error(respon.__('data.failed'))
                    print.debug('request from client to store user data failed due missing form data')
    
                    return responseData.error(permintaan, respon, {
                        message: respon.__('data.failed'),
                        error: error
                    }, 400)
                }
    
                var duplicate = users.find((user) => user.urutan == form.urutan)
            
                if (duplicate) {
                    print.error(respon.__('data.failed'))
                    print.debug('request from client to store user data failed due duplicated')
    
                    return responseData.error(permintaan, respon, {
                        message: respon.__('data.failed'),
                        error: respon.__('data.duplicate')
                    }, 409)
                } else {
                    users.push(form)
                
                    userRepository.saveUserData(users)
                
                    print.info(respon.__('data.success', respon.__('operator.add')))
                    print.debug('request from client to store user data success')
    
                    return responseData.success(permintaan, respon, {
                        message: respon.__('data.success', respon.__('operator.add')),
                        data: userRepository.getUserData()
                    }, 201)
                }   
            } else if (database.default == 'mongoose') {
                var user = await userRepository.saveUserData(form)
    
                print.info(respon.__('data.success', respon.__('operator.add')))
                print.debug('request from client to store user data success')
    
                return responseData.success(permintaan, respon, {
                    message: respon.__('data.success', respon.__('operator.add')),
                    data: user
                }, 201)
            }
        } catch (error) {
            return responseData.error(permintaan, respon, {
                error: error.message
            }, 500)
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
    show: async (permintaan, respon) => {
        var urutan = permintaan.params.id

        try {
            var isExist = await userRepository.findUserData(urutan)

            if (!isExist) {
                print.error(respon.__('data.not_found'))
                print.debug('request from client to store user data failed due data not found')
    
                return responseData.error(permintaan, respon, {
                    message: respon.__('data.not_found')
                }, 404)
            } else {
                print.info(JSON.stringify(isExist))
                print.debug('request from client to store user data success')
    
                return responseData.success(permintaan, respon, {
                    data: isExist
                }, 206)
            }
        } catch (error) {
            return responseData.error(permintaan, respon, {
                message: error.message
            }, 500)
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
    update: async (permintaan, respon) => {
        var forms = permintaan.body
        var urutan = permintaan.params.id

        try {
            if (database.default == 'file') {
                var users = userRepository.getUserData()
                var isExist = userRepository.findUserData(urutan)
    
                if (!isExist) {
                    print.error(respon.__('data.not_found'))
                    print.debug('request from client to store user data failed due data not found')
    
                    return responseData.error(permintaan, respon, {
                        message: respon.__('data.not_found')
                    }, 404)
                }
    
                if (!forms.nama || !forms.email) {
                    var error = []
    
                    if (!form.nama) {
                        error.push(respon.__('validation.required', 'nama'))
                    }
    
                    if (!form.email) {
                        error.push(respon.__('validation.required', 'email'))
                    }
    
                    print.error(respon.__('data.failed'))
                    print.debug('request from client to store user data failed due mising form data')
    
                    return responseData.error(permintaan, respon, {
                        message: respon.__('data.failed'),
                        error: error
                    }, 400)
                } else {
                    urutan = urutan - 1
    
                    users[urutan].nama = forms.nama
                    users[urutan].email = forms.email
            
                    userRepository.saveUserData(users)
            
                    print.info(respon.__('data.success', respon.__('operator.change')))
                    print.debug('request from client to store user data success')
    
                    return responseData.success(permintaan, respon, {
                        message: respon.__('data.success', respon.__('operator.change')),
                        data: users
                    }, 202)
                } 
            } else if (database.default == 'mongoose') {
                var user = await userRepository.updateUserData(urutan, forms)
    
                print.info(respon.__('data.success', respon.__('operator.change')))
                print.debug('request from client to store user data success')
    
                return responseData.success(permintaan, respon, {
                    message: respon.__('data.success', respon.__('operator.change')),
                    data: user
                }, 202)
            }
        } catch (error) {
            return responseData.error(permintaan, respon, {
                error: error.message
            }, 500)
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
    destroy: async (permintaan, respon) => {
        var urutan = permintaan.params.id
        
        try {
            if (database.default == 'file') {
                var users = userRepository.getUserData()
                var usersToKepp = users.filter((user) => user.urutan != urutan)
    
                if (users.length <= usersToKepp.length) {
                    print.error(respon.__('data.not_found'))
                    print.debug('request from client to store user data failed due data not found')
    
                    return responseData.error(permintaan, respon, {
                        message: respon.__('data.not_found')
                    }, 403)
                } else {
                    userRepository.saveUserData(usersToKepp)
    
                    print.info(respon.__('data.success', respon.__('operator.delete')))
                    print.debug('request from client to store user data success')
    
                    return responseData.success(permintaan, respon, {
                        message: respon.__('data.success', respon.__('operator.delete')),
                        data: usersToKepp
                    }, 202)
                }
            } else if (database.default == 'mongoose') {
                await userRepository.destroyUserData(urutan)
                var users = await userRepository.getUserData()
    
                print.info(respon.__('data.success', respon.__('operator.delete')))
                print.debug('request from client to store user data success')
    
                return responseData.success(permintaan, respon, {
                    message: respon.__('data.success', respon.__('operator.delete')),
                    data: users
                }, 202)
            }
        } catch (error) {
            return responseData.error(permintaan, respon, {
                error: error.message
            }, 500)
        }
    },
}