var router = require('express').Router()

// Get Config File
var { system } = require('../config/path')

// Controller
var taskController = require(`../app/http/${system.controller}/TaskController`)

// Main Route
router.get('/tasks', taskController.index)
router.post('/task', taskController.store)
router.get('/task/:id', taskController.show)
router.put('/task/:id', taskController.update)
router.delete('/task/:id', taskController.destroy)

// Module Export
module.exports = router