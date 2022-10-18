// Get Config File
var { system } = require('../../../config/path')

// Traits
var print = require(`../../${system.trait}/consoleLogger`)
var responseData = require(`../../${system.trait}/responseData`)

// Services
var userService = require(`../../${system.service}/UserService`)

// Catch Error
function catchError(permintaan, respon, error) {
    print.error(error.message)

    return responseData.error(permintaan, respon, {
        message: 'system error',
        error: error.message
    }, 500)
}

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
        try {
            userService.index(permintaan, respon)
        } catch (error) {
            catchError(permintaan, respon, error)
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
        try {
            userService.store(permintaan, respon)
        } catch (error) {
            catchError(permintaan, respon, error)
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
        try {
            userService.show(permintaan, respon)
        } catch (error) {
            catchError(permintaan, respon, error)
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
        try {
            userService.update(permintaan, respon)
        } catch (error) {
            catchError(permintaan, respon, error)
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
        try {
            userService.destroy(permintaan, respon)
        } catch (error) {
            catchError(permintaan, respon, error)
        }
    },
}