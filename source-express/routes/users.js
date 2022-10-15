const express = require('express')
const router = express.Router()

// Const for config
var controllerPath = process.env.PATH_CONTROLLER || 'controller'

// Controller
const userController = require(`../${controllerPath}/users`)

// Main Route
router.get('/users', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

// Module Export
module.exports = router