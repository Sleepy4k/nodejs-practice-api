module.exports = {
    // Create success response body
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
    
    // Create error response body
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