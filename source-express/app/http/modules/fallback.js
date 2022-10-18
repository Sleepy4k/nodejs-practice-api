// Get Config File
var { system } = require('../../../config/path')

// Traits
var print = require(`../../${system.trait}/consoleLogger`)
var responseData = require(`../../${system.trait}/responseData`)

// Handler fallback when route error
module.exports = function(permintaan, respon) {
    print.error(respon.__('route.not_found'))

    return responseData.error(permintaan, respon, {
        message: respon.__('route.not_found')
    }, 404)
}