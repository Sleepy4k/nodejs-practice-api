const express = require('express')
const router = express.Router()

// Controller
const userController = require('../controller/users')

// Main Route
router.get('/users', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

// Module Export
module.exports = router