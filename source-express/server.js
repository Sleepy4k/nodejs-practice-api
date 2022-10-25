var express = require('express')

// Get Config File
var { system } = require('./config/path')
var database = require('./config/database')
var { port, env, url, debug } = require('./config/app')

// Traits
var print = require(`./app/${system.trait}/consoleLogger`)

// Express init
var app = express()

// Read Form Request
app.use(express.json())

// Read Encode Form Request
app.use(express.urlencoded({ extended: true }))

// Translate System
app.use(require(`./app/http/${system.modules}/i18n`))

// Write Header
app.use(require(`./app/http/${system.modules}/header`))

// Main Web Route
app.use(require(`./${system.router}`))

// Fallback when route not found
app.use(require(`./app/http/${system.modules}/fallback`))

// Developer Mode
if (env == 'local') {
    // Import Module
    var testModule = require(`./${system.tests}/${system.modules}/testModule`)
    
    // Init Module
    app.use(testModule)
    
    // Main Route
    app.use(require(`./${system.tests}/${system.router}`))
}

// Mongoose Connect
if (database.default == 'mongoose') {
    // Mongoose init
    var connectDB = require('./config/mongoose')

    // Mongoose process
    connectDB.connect()
}

// Listen Web
app.listen(port, () => {
    print.warning(`Warning you running this server in ${env} mode`)

    if (debug == 'true') {
        print.warning(`Warning you running this with debug mode`, true)
    }

    print.info(`listening on port ${port}`, true)
    print.info(`server serve at ${url}:${port}`, true)
})