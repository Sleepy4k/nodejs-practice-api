var chalk = require("chalk")

// Get Config File
var { env, name } = require('../config/app')

module.exports = {
    /**
     * Create success respon body
     *
     * @param Request permintaan
     * @param Response respon
     * @param Params params
     * 
     * @return Array
     */
    success: function(permintaan, respon, params) {
        if (env == 'local') {
            console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', 'create success response api'))))
        }

        respon.json({
            status: true,
            message: params.message,
            meta: {
                hostname: permintaan.hostname,
                method: permintaan.method,
                url: permintaan.url
            },
            data: params.data
        })
    },
    
    /**
     * Create error respon body
     *
     * @param Request permintaan
     * @param Response respon
     * @param Params params
     * 
     * @return Array
     */
    error: function(permintaan, respon, params) {
        if (env == 'local') {
            console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', 'create error response api'))))
        }

        respon.json({
            status: false,
            message: params.message,
            error: params.error,
            meta: {
                hostname: permintaan.hostname,
                method: permintaan.method,
                url: permintaan.url
            }
        })
    },
}