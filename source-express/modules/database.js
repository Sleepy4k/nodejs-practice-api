var chalk = require("chalk")

// Get Config File
var { env, name } = require('../config/app')
var config = require('../config/database')

// Validate database config
function validate(type) {
    try {
        var connection = config.connections
    
        connection.forEach(element => {
            if (element.driver == type) {
                return false
            }
        });
    } catch (error) {
        if (env == 'local') {
            console.log(chalk.red.bold(`[${name}] Response: database default error`));
        }

        return true
    }
}

module.exports = {
    get: function() {
        if (!validate(config.default)) {
            return config.default
        }
    }
}