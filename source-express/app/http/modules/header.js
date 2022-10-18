// Set Header For Response API
module.exports = function(permintaan, respon, next) {
    respon.setHeader("Content-Type", "application/json")
    respon.setHeader("Accept", "application/json")
    respon.setHeader("X-Powered-By", "Express")

    next()
}