// Get Config File
var { system } = require('../../config/path')
var database = require('../../config/database')

// Get users model
var model = require(`../${system.models}/users`)

if (database.default == 'file') {
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
} else if (database.default == 'mongoose') {
    module.exports = {
        /**
         * Display a listing of the model.
         * 
         * @return Array
         */
        getUserData: function() {
            return model.find()
        },
        
        /**
         * Store a newly created resource in model.
         *
         * @param Object body
         * 
         * @return Bool
         */
        saveUserData: function(body) {
            return model.create(body)
        },
    
        /**
         * Display a specified model.
         *
         * @param int id
         * 
         * @return Array
         */
        findUserData: function(id) {
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
        updateUserData: function(id, body) {
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
        destroyUserData: function(id) {
            return model.findByIdAndDelete(id)
        }
    } 
}