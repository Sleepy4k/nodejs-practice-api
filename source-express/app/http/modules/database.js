// Get Config File
var { system } = require('../../../config/path')
var config = require('../../../config/database')

// Traits
var print = require(`../../${system.trait}/consoleLogger`)

// Validate database config
function validate(type) {
    try {
        var connection = config.connections
    
        connection.forEach(element => {
            if (element.driver == type) {
                print.debug('database connection default exist')

                return false
            }
        });
    } catch (error) {
        print.error('database default error or not exist')

        return true
    }
}

module.exports = {
    /**
     * Get connection from config
     * 
     * @return String
     */
    get: function() {
        if (!validate(config.default)) {
            return config.default
        }
    }
}