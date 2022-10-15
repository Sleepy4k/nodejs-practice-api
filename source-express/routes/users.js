var express = require('express')
var router = express.Router()

// Get Config File
var { system } = require('../config/path')

// Controller
var userController = require(`../${system.controller}/UserController`)

// Main Route
router.get('/users', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)

// Module Export
module.exports = router