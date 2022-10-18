// Get Config File
var { system } = require('../../../config/path')

// Traits
var print = require(`../../${system.trait}/consoleLogger`)
var responseData = require(`../../${system.trait}/responseData`)

// Services
var taskService = require(`../../${system.service}/TaskService`)

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
            taskService.index(permintaan, respon)
        } catch (error) {
            print.error(error.message)

            return responseData.error(permintaan, respon, {
                message: 'system error',
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
    store: (permintaan, respon) => {
        try {
            taskService.store(permintaan, respon)
        } catch (error) {
            print.error(error.message)
        
            return responseData.error(permintaan, respon, {
                message: 'system error',
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
    show: (permintaan, respon) => {
        try {
            taskService.show(permintaan, respon)
        } catch (error) {
            print.error(error.message)
        
            return responseData.error(permintaan, respon, {
                message: 'system error',
                error: error.message
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
    update: (permintaan, respon) => {
        try {
            taskService.update(permintaan, respon)
        } catch (error) {
            print.error(error.message)
        
            return responseData.error(permintaan, respon, {
                message: 'system error',
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
    destroy: (permintaan, respon) => {
        try {
            taskService.destroy(permintaan, respon)
        } catch (error) {
            print.error(error.message)
        
            return responseData.error(permintaan, respon, {
                message: 'system error',
                error: error.message
            }, 500)
        }
    },
}