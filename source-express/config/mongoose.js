var mongoose = require('mongoose')

// Get Config File
var { system } = require('./path')
var database = require('./database')

// Traits
var print = require(`../app/${system.trait}/consoleLogger`)

// Main logic
if (database.default == 'mongoose') {
    var connection = database.connections[1]

    module.exports = {
        connect: async function main() {
            await mongoose.connect(`mongodb://${connection.host}:${connection.port}/${connection.database}`);
            print.info('Database connected with host server', true)
        },
        status: function() {
            return mongoose.STATES[mongoose.connection.readyState] 
        }
    }
}