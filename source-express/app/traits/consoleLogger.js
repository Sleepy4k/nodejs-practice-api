var chalk = require("chalk")

// Get Config File
var { env, name, debug } = require('../../config/app')

// Get Current Date
function getCurrentDate() {
    var today = new Date()
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    return CurrentDateTime = date + ' ' + time;
}

module.exports = {
    /**
     * Create console log for give information message
     *
     * @param Message message
     * 
     * @return String
     */
    info: function(message, bypass) {
        if (env == 'local' || bypass) {
            console.log(chalk.green.bold(`[${name}] [${getCurrentDate()}] INFO : ${message}`))
        }
    },

    /**
     * Create console log for give warning message
     *
     * @param Message message
     * 
     * @return String
     */
    warning: function(message, bypass) {
        if (env == 'local' || bypass) {
            console.log(chalk.yellow.bold(`[${name}] [${getCurrentDate()}] WARNING : ${message}`))
        }
    },

    /**
     * Create console log for give debug message
     *
     * @param Message message
     * 
     * @return String
     */
    debug: function(message, bypass) {
        if (env == 'local' || bypass || debug) {
            console.log(chalk.blue.bold(`[${name}] [${getCurrentDate()}] DEBUG : ${message}`))
        }
    },

    /**
     * Create console log for give error message
     *
     * @param Message message
     * 
     * @return String
     */
    error: function(message, bypass) {
        if (env == 'local' || bypass) {
            console.log(chalk.red.bold(`[${name}] [${getCurrentDate()}] ERROR : ${message}`))
        }
    }
}