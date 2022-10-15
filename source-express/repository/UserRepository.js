var { system } = require('../config/path')

// Get users model
var model = require(`../${system.models}/users`)

module.exports = {
    /**
     * Display a listing of the model.
     * 
     * @return Array
     */
    getUserData: function() {
        return model.get()
    },
    
    /**
     * Store a newly created resource in model.
     *
     * @param Object body
     * 
     * @return Bool
     */
    saveUserData: function(body) {
        return model.store(body)
    },

    /**
     * Display a specified model.
     *
     * @param int id
     * 
     * @return Array
     */
    findUserData: function(id) {
        return model.find(id)
    }
}