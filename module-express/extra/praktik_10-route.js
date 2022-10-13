const express = require('express')
const router = express.Router()

// Controller
const userController = require(`../${process.env.PATH_CONTROLLER}/users`)

// Main Route
router.get('/users', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.patch('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

// Module Export
module.exports = router