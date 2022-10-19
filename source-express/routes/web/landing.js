// Get Config File
var { system } = require('../../config/path')

// Traits
var print = require(`../../app/${system.trait}/consoleLogger`)
var responseData = require(`../../app/${system.trait}/responseData`)

// Main Route
module.exports = (app) => {
    app.get('/', async (permintaan, respon) => {
        print.debug(respon.__('greeting'))
    
        return responseData.success(permintaan, respon, {
            message: respon.__('greeting')
        })
    })
}