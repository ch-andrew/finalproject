var mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'cimo',
    host: 'localhost'
})

module.exports = db