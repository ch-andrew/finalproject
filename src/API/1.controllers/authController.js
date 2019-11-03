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
    },

    login: (req, res) => {
        let sql = `select * from users where email = '${req.query.email}'`
        let sql2 = `select * from users where password = '${req.query.password}'`

        db.query(sql, (err, result) => {
            if(err) throw err

            if(result.length === 0){
                res.send({
                    status : '401',
                    error : 'Email is not registered. Please try again with a valid registered email address'
                })
            }
            else {
                db.query(sql2, (err2, result2) => {
                    if(err2) throw err2

                    if(result2.length === 0){
                        res.send({
                            status : '401',
                            error : 'Your password does not match. Please try again'
                        })
                    }

                    else {
                        res.send({
                            status : '200',
                            success : 'You have logged in successfully.',
                            user : result2
                        })
                    }
                })
            }
        }) 
    } 
}