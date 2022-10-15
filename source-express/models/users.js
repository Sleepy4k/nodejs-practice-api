var model = require('../modules/model')

// Database Column
var column = 'users'

module.exports = {
    /**
     * Display a listing of the model.
     * 
     * @return Array
     */
    get: function() {
        if (model.exist(column)) {
            return model.get(column)
        }
    },

    /**
     * Store a newly created resource in model.
     *
     * @param Object body
     * 
     * @return Bool
     */
    store: function(data) {
        if (model.exist(column)) {
            return model.store(column, data)
        }
    },

    /**
     * Display a specified model.
     *
     * @param int id
     * 
     * @return Array
     */
    find: function(id) {
        if (model.exist(column)) {
            return model.find(column, id)
        }
    }
}