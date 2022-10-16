var express = require('express')
var { I18n } = require('i18n')
var router = express.Router()
var chalk = require("chalk")
var path = require('path')

// Get Config File
var { name, env, locale } = require('../../../config/app')
var { system } = require('../../../config/path')

var i18n = new I18n({
    // setup some locales - other locales default to en silently
    locales: ['en', 'id'],

    // you may alter a site wide default locale
    defaultLocale: locale,

    // will return translation from defaultLocale in case current locale doesn't provide it
    retryInDefaultLocale: false,

    // sets a custom header name to read the language preference from - accept-language header by default
    header: 'accept-language',

    // where to store json files - defaults to './locales' relative to modules directory
    directory: path.join(__dirname, `../../../${system.translate}`),

    // watch for changes in JSON files to reload locale on updates - defaults to false
    autoReload: true,

    // whether to write new locale information to disk - defaults to true
    updateFiles: false,

    // sync locale information across all files - defaults to false
    syncFiles: false,

    // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
    extension: '.json',

    objectNotation: true,

    // setting of log level DEBUG - default to require('debug')('i18n:debug')
    logDebugFn: function (msg) {
        if (env == 'local') {
            console.log(chalk.yellow.bold(`[${name}] I18N: debug ${msg}`));
        }
    },

    // setting of log level WARN - default to require('debug')('i18n:warn')
    logWarnFn: function (msg) {
        if (env == 'local') {
            console.log(chalk.red.bold(`[${name}] I18N: warn ${msg}`));
        }
    },

    // setting of log level ERROR - default to require('debug')('i18n:error')
    logErrorFn: function (msg) {
        if (env == 'local') {
            console.log(chalk.red.bold(`[${name}] I18N: error ${msg}`));
        }
    },

    // used to alter the behaviour of missing keys
    missingKeyFn: function (locale, value) {
        if (env == 'local') {
            console.log(chalk.red.bold(`[${name}] I18N: missing translate key ${value}, in locale ${locale}`));
        }

        return value
    }
})

// Middleware for translate init
router.use((permintaan, respon, next) => {
    i18n.init(permintaan, respon)
    var locale = i18n.getLocale()

    if (env == 'local') {
        console.log(chalk.blue.bold(`[${name}] I18N: get translate data from ${locale} locale`));
    }
    
    next()
})

module.exports = router