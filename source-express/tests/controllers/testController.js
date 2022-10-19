// Get Config File
var { name, debug, port, env, url, locale } = require('../../config/app')
var { system } = require('../../config/path')

// Traits
var print = require(`../../app/${system.trait}/consoleLogger`)
var responseData = require(`../../app/${system.trait}/responseData`)

// Main Test
module.exports = (app) => {
    // Todo
};