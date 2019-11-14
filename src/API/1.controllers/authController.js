const db = require('../database')
var nodemailer = require('nodemailer')
// var { pdfcreate } = require('../3.helpers/html-pdf')
// const fs = require('fs')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'covelgaming@gmail.com',
        pass: 'gdzvmtbxmtabjbia'
    },
    tls : {
        rejectUnauthorized: false
    }
})

module.exports = {
    checkUsers : (req, res) => {
        let sql = `select * from users where email = '${req.body.email}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                result
            })
        })
    },

    register: (req, res) => {
        let sql = `select * from users where email = '${req.body.email}'`
        let sql2 = `insert into users value (0, '${req.body.email}', '${req.body.password}', '${req.body.firstName}', '${req.body.lastName}' , 'free' , 0, 0)`

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
                let to = req.body.email
                let fullname = req.body.firstName + ' ' + req.body.lastName

                let mailOptions = {
                    from : 'Cimo',
                    to,
                    subject: 'Secure Your Account - Verify Email Address',
                    html: `<h1 style="color : #007BFF; text-align : center">Verifiy Your Email</h1> <br/>
                    <p style="font-size: 18px; text-align : center">Hi ${fullname}, <br/>Please verify your email to secure your account. <br/>
                    <a href='http://localhost:2077/auth/verify?email=${req.body.email}'>Verify Now</a></p>`
                }
                if(to){
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err) throw err
                        res.send('Email Berhasil!')
                    })
                }else{
                    res.send('Email kosong!')
                }

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

    verify: (req, res) => {
        let sql = `update users set isVerified = 1 where email = '${req.query.email}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                status: '201',
                success: 'Email is verified!'
            })
        })
    },

    subscribe: (req, res) => {
        let sql = `update users set isVerified = 1 where email = '${req.query.email}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                status: '201',
                success: 'Email is verified!'
            })
        })
    },

    login: (req, res) => {
        let sql = `select * from users where email = '${req.query.email}'`
        let sql2 = `select * from users where email = '${req.query.email}' and password = '${req.query.password}'`

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
    },

    getInformation: (req, res) => {
        let sql = `select * from userinformation where userId = ${req.query.userId}`

        let sql2 = `select * from users where id = ${req.query.userId}`

        db.query(sql, (err, result) => {
            if(err) throw err
            if(result){
                db.query(sql2, (err2, result2) => {
                    if(err2) throw err2
                    res.send({
                        user: result2,
                        info: result
                    })
                })
            }
        })
    },

    changeInformation: (req, res) => {

        let sql = `select * from userinformation where userId = ${req.body.userId}`

        let sql2 = `insert into userinformation values 
                    (0, '${req.body.firstName}', '${req.body.lastName}', '${req.body.shippingAddress}', '${req.body.city}',
                    '${req.body.province}', '${req.body.zipCode}', '${req.body.country}', '${req.body.phoneNumber}', ${req.body.userId})`

        let sql3 = `update users set email = '${req.body.email}', password = '${req.body.password}', firstName = '${req.body.firstName}', 
                    lastName = '${req.body.lastName}' where id = ${req.body.userId}`

        let sql4 = `update userinformation set firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', 
                    shippingAddress = '${req.body.shippingAddress}', city = '${req.body.city}' , province = '${req.body.province}',
                    zipCode = '${req.body.zipCode}', country = '${req.body.country}', phoneNumber = '${req.body.phoneNumber}'
                    where userId = ${req.body.userId}`
        
        if(req.body.type === 'changeUser'){
            db.query(sql3, (err, result) => {
                if(err) throw err
                res.send({
                    status: '201',
                    success: 'Your account information has been changed!',
                })
            })
        }
        else if (req.body.type === 'changeInfo'){
            db.query(sql4, (err,result) => {
                if(err) throw err
                res.send({
                    status: '201',
                    success: 'Your user information has been changed!',
                })
            })
        }

        else {
            db.query(sql, (err, result) => {
                if(err) throw err
                if(result){
                    db.query(sql2, (err2, result2) => {
                        if(err2) throw err2
                        res.send({
                            status: '201',
                            success: 'Your account information has been saved!'
                        })
                    })
                }
            })
        }
    },
}