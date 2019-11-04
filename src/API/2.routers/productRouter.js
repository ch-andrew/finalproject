var express = require('express')
var router = express.Router()
const { productController } = require('../1.controllers')

router.get('/list', productController.getList)

router.get('/all', productController.getProducts)

router.get('/name' , productController.getExistingProduct)

module.exports = router