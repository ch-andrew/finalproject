var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')


const port = 2077

const {
    authRouter, productRouter, cartRouter, transactionRouter
} = require('./2.routers')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('hehe')
})

app.use(express.static('./public'))

app.use('/auth', authRouter)

app.use('/products' , productRouter)

app.use('/cart' , cartRouter)

app.use('/transaction' , transactionRouter)

app.listen(port, console.log('Server is Online ...'))