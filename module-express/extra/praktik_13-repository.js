var fs = require('fs')

// Get Config File
var { system } = require('../config/path')

// Database Location
var userData = `./${system.database}/users.json`

module.exports = {
    /**
     * Display a listing of the model.
     * 
     * @return Array
     */
    getUserData: function() {
        var dataBuffer = fs.readFileSync(userData)
        var dataJSON = dataBuffer.toString()

        return JSON.parse(dataJSON)
    },
    
    /**
     * Store a newly created resource in model.
     *
     * @param Object body
     * 
     * @return Bool
     */
    saveUserData: function(body) {
        var stringifyData = JSON.stringify(body)

        fs.writeFileSync(userData, stringifyData)

        return true
    },
}