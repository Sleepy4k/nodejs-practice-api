// Set Header For Response API
function fallback(permintaan, respon, next) {
    respon.setHeader("Content-Type", "application/json")
    respon.setHeader("X-Powered-By", "Express")

    next()
}

module.exports = fallback