var express = require('express')
var router = express.Router()
const { productController } = require('../1.controllers')

router.get('/list', productController.getProducts)

module.exports = router