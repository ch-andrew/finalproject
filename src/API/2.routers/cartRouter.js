var express = require('express')
var router = express.Router()
const { cartController } = require('../1.controllers')

router.post('/addtocart' , cartController.addToCart)

router.put('/addquantity' , cartController.addQuantity)

router.put('/changequantity' , cartController.quantityChange)

router.get('/data' , cartController.getCart)

router.get('/subtotal' , cartController.countSubtotal)

router.post('/remove' , cartController.removeItem)

module.exports = router