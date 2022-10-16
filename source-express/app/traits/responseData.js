// Traits
var print = require(`./consoleLogger`)

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
    success: function(permintaan, respon, params, code) {
        print.info('create success response api')

        respon.status(code || 200)

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
    error: function(permintaan, respon, params, code) {
        print.info('create error response api')

        respon.status(code || 500)

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