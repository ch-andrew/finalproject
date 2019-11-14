var express = require('express')
var router = express.Router()
const { transactionController } = require('../1.controllers')
var multer = require('multer')

let multerStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpeg'){
        cb(null, true)
    } else {
        req.validation = {error : true, msg : 'File must be an image'}
        cb(null, false)
    } 
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

router.post('/uploadpaymentproof', upload.single('proof'), transactionController.uploadPayment) 

router.get('/' , transactionController.getTransactions)

router.post('/add-order' , transactionController.convertCart)

router.post('/checkout', transactionController.checkout)

router.post('/status', transactionController.changeStatus)

router.post('/pay-time', transactionController.transactionHandler)

router.get('/details', transactionController.getDetails)

module.exports = router