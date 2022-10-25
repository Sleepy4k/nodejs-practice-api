var fs = require('fs')
var path = require('path')

// Get Config File
var { system } = require('../../../config/path')

// Traits
var print = require(`../../${system.trait}/consoleLogger`)

// Validate database
var database = require('./database')

// Database Location
var dbPath = path.join(__dirname, `../../../${system.database}`)

module.exports = {
    /**
     * Check if database connection exist
     *
     * @param File file
     * 
     * @return Bool
     */
    exist: function(file) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                fs.statSync(path)
            }

            print.info('database file exist')

            return true
        } catch (error) {
            if (database.get() == 'file') {
                fs.closeSync(fs.openSync(path, 'w'))
                fs.writeFileSync(path, '[]')
            }

            print.error(error.message)

            return module.exports.exist(file)
        }
    },

    /**
     * Get data from database
     *
     * @param File file
     * 
     * @return Array
     */
    get: function(file) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                var dataBuffer = fs.readFileSync(path)
                var dataString = dataBuffer.toString()
        
                return JSON.parse(dataString)
            }
        } catch (error) {
            print.error(error.message)
        }
    },

    /**
     * Store data to database
     *
     * @param File file
     * @param Body body
     * 
     * @return Bool
     */
    store: function(file, body) {
        var path = `${dbPath}/${file}.json`

        try {
            if (database.get() == 'file') {
                var dataString = JSON.stringify(body)
                var dataSaved = fs.writeFileSync(path, dataString)
                
                return dataSaved
            }
        } catch (error) {
            print.error(error.message)
        }
    },

    /**
     * Find data from database
     *
     * @param File file
     * @param Id id
     * 
     * @return Array
     */
    find: function(file, id) {
        try {
            var users = module.exports.get(file)
            var user = users.find((user) => user.urutan == id)

            return user
        } catch (error) {
            print.error(error.message)
        }
    }
}