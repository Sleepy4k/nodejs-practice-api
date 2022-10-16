// Get Config File
var { system } = require('../../config/path')

// Get users model
var model = require(`../${system.models}/tasks`)

module.exports = {
    /**
     * Display a listing of the model.
     * 
     * @return Array
     */
    getTaskData: function() {
        return model.get()
    },
    
    /**
     * Store a newly created resource in model.
     *
     * @param Object body
     * 
     * @return Bool
     */
    saveTaskData: function(body) {
        return model.store(body)
    },

    /**
     * Display a specified model.
     *
     * @param int id
     * 
     * @return Array
     */
    findTaskData: function(id) {
        return model.find(id)
    }
}