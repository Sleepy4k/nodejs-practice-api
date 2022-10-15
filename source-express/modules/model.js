var fs = require('fs')
var chalk = require("chalk")

// Get Config File
var { env, name } = require('../config/app')
var { system } = require('../config/path')

// Validate database
var database = require('./database')

// Database Location
var dbPath = `./${system.database}`

module.exports = {
    exist: function(file) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                fs.statSync(path)
            }

            if (env == 'local') {
                console.log(chalk.blue.bold(`[${name}] Response: database file exist`));
            }

            return true
        } catch (error) {
            fs.closeSync(fs.openSync(path, 'w'))
            fs.writeFileSync(path, '[]')

            if (env == 'local') {
                console.log(chalk.red.bold(`[${name}] Response: ${error}`));
            }

            return module.exports.exist(file)
        }
    },
    get: function(file) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                var dataBuffer = fs.readFileSync(path)
                var dataString = dataBuffer.toString()
        
                return JSON.parse(dataString)
            }
        } catch (error) {
            if (env == 'local') {
                console.log(chalk.red.bold(`[${name}] Response: ${error}`));
            }
        }
    },
    store: function(file, body) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                var dataString = JSON.stringify(body)
                var dataSaved = fs.writeFileSync(path, dataString)
                
                return dataSaved
            }
        } catch (error) {
            if (env == 'local') {
                console.log(chalk.red.bold(`[${name}] Response: ${error}`));
            }
        }
    },
    find: function(file, id) {
        try {
            var users = module.exports.get(file)
            var user = users.find((user) => user.urutan == id)

            return user
        } catch (error) {
            if (env == 'local') {
                console.log(chalk.red.bold(`[${name}] Response: ${error}`));
            }
        }
    }
}