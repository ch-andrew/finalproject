var express = require('express')
var router = express.Router()
const { transactionController } = require('../1.controllers')

router.post('/checkout', transactionController.checkout)

router.get('/details', transactionController.getDetails)

module.exports = router