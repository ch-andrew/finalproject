var express = require('express')
var router = express.Router()
const { authController } = require('../1.controllers')

router.post('/register', authController.register)

router.get('/verify', authController.verify)

router.get('/login', authController.login)

router.get('/info', authController.getInformation)

router.post('/change-information', authController.changeInformation)

module.exports = router