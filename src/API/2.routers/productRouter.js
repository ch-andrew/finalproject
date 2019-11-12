var express = require('express')
var router = express.Router()
const { productController } = require('../1.controllers')

router.get('/list', productController.getList)

router.get('/all', productController.getProducts)

router.get('/men', productController.getMenProducts)

router.get('/women', productController.getWomenProducts)

router.get('/names' , productController.getExistingProduct)

router.get('/options' , productController.getOptions)

router.post('/add' , productController.addProduct)

router.get('/price/:id' , productController.getPrice)

router.get('/detail/:id' , productController.getProduct)

router.get('/test' , productController.test)

module.exports = router