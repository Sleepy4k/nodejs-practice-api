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