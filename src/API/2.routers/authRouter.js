var express = require('express')
var router = express.Router()
const { authController } = require('../1.controllers')

router.post('/register', authController.register)

module.exports = router