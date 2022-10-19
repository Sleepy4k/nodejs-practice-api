// Get Config File
var { system } = require('../../config/path')

// Controller
var userController = require(`../../app/http/${system.controller}/UserController`)

// Main Route
module.exports = (app) => {
    app.get('/users', userController.index)
    app.post('/user', userController.store)
    app.get('/user/:id', userController.show)
    app.put('/user/:id', userController.update)
    app.delete('/user/:id', userController.destroy)
};