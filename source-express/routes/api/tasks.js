// Get Config File
var { system } = require('../../config/path')

// Controller
var taskController = require(`../../app/http/${system.controller}/TaskController`)

// Main Route
module.exports = (app) => {
    app.get('/tasks', taskController.index)
    app.post('/task', taskController.store)
    app.get('/task/:id', taskController.show)
    app.put('/task/:id', taskController.update)
    app.delete('/task/:id', taskController.destroy)
};