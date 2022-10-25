// Get Config File
var { system } = require('../../config/path')
var database = require('../../config/database')

// Get model handler
var model = require(`../http/${system.modules}/model`)

if (database.default == 'file') {
    // Database Column
    var column = 'tasks'

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
} else if (database.default == 'mongoose') {
    // Export Mongoose
    var mongoose = require('mongoose')

    // Mongoose Init
    module.exports = mongoose.model('tasks', new mongoose.Schema({
        tugas: {
            type: String,
            required: [true, 'Silahkan isikan tugas'],
            unique: false
        }
    }))
}