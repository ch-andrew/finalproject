const db = require('../database')
// var nodemailer = require('nodemailer')
// var { pdfcreate } = require('../3.helpers/html-pdf')
// const fs = require('fs')

module.exports = {
    register: (req, res) => {
        let sql = `select * from users where email = '${req.body.email}'`
        let sql2 = `insert into users value (0, '${req.body.email}', '${req.body.password}', '${req.body.firstName}', '${req.body.lastName}' , 'free' , 0)`

        db.query(sql, (err,result) => {
            if(err) throw err
            
            // Email has already been used
            if(result.length > 0){
                res.send ({
                    status: '400',
                    error: 'Email has already been used! Please try again with a different email.'
                })
            }
            // Successfully Registered
            else {
                db.query(sql2, (err2,result2) => {
                    if(err2) throw err2
                    res.send ({
                        status: '201',
                        success: 'Your account has been registered!'
                    })
                })
            }
        })
    }
}