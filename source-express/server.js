var express = require('express')
var app = express()

// Get Config File
var { system } = require('./config/path')
var { port, env, url, debug } = require('./config/app')

// List Route
var index = require(`./${system.router}/index`)
var users = require(`./${system.router}/users`)
var tasks = require(`./${system.router}/tasks`)

// Middleware
var i18n = require(`./app/http/${system.modules}/i18n`)
var header = require(`./app/http/${system.modules}/header`)
var fallback = require(`./app/http/${system.modules}/fallback`)

// Traits
var print = require(`./app/${system.trait}/consoleLogger`)

// Read Form Request
app.use(express.json())

// Read Encode Form Request
app.use(express.urlencoded({ extended: true }))

// Translate System
app.use(i18n)

// Write Header
app.use(header)

// Main Web Route
app.use(index)
app.use('/api', users)
app.use('/api', tasks)

// Fallback when route not found
app.use(fallback)

// Listen Web
app.listen(port, () => {
    print.warning(`Warning you running this server in ${env} mode`)

    if (debug == 'true') {
        print.warning(`Warning you running this with debug mode`, true)
    }

    print.info(`listening on port ${port}`, true)
    print.info(`server serve at ${url}:${port}`, true)
})