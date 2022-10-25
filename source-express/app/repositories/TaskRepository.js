// Get Config File
var { system } = require('../../config/path')
var database = require('../../config/database')

// Get tasks model
var model = require(`../${system.models}/tasks`)

if (database.default == 'file') {
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
} else if (database.default == 'mongoose') {
    module.exports = {
        /**
         * Display a listing of the model.
         * 
         * @return Array
         */
        getTaskData: function() {
            return model.find()
        },
        
        /**
         * Store a newly created resource in model.
         *
         * @param Object body
         * 
         * @return Bool
         */
        saveTaskData: function(body) {
            return model.create(body)
        },
    
        /**
         * Display a specified model.
         *
         * @param int id
         * 
         * @return Array
         */
        findTaskData: function(id) {
            return model.findById(id)
        },
    
        /**
         * Update the specified resource in model.
         *
         * @param int id
         * @param Object body
         * 
         * @return Array
         */
        updateTaskData: function(id, body) {
            return model.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            })
        },
    
        /**
         * Remove the specified resource from model.
         *
         * @param int id
         * 
         * @return Array
         */
        destroyTaskData: function(id) {
            return model.findByIdAndDelete(id)
        }
    } 
}