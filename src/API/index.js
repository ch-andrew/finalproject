var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')


const port = 2077

const {
    authRouter
} = require('./2.routers')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('hehe')
})

app.use(express.static('./public'))

app.use('/auth', authRouter)

app.listen(port, console.log('Server yeyeyeeee'))