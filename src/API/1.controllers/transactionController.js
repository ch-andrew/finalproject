const db = require('../database')
const fs = require('fs')

module.exports = {

    getTransactions: (req, res) => {
        let sql = `select * from transactions t join users u on u.id = t.userId`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                result
            })
        })
    },

    checkout: (req,res) => {
        let sql = `insert into transactions value (0, 'N' , 'N', ${req.body.userId} , ${req.body.quantity} , '${req.body.currency}', ${req.body.total} , 0 , 0 , 0 , 0, 'Pending')`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    },

    getDetails: (req, res) => {
        let sql = `select * from transactions where userId = ${req.query.userId}`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                result
            })
        })
    },

    transactionHandler : (req, res)=> {
        let sql = `update transactions set paymentIssued = '${req.body.paymentIssued}', paymentDeadline = '${req.body.paymentDeadline}' where userId = ${req.body.userId} and status = 'Pending'`
        
        let sql2 = `select * from transactions where userId = '${req.body.userId}' and (status = 'Pending' or status = 'Waiting Approval')`

        let sql3 = `update transactions set status = 'Expired' where userId = '${req.body.userId}' and status = 'Pending'`

        let sql4 = `update cart set checkout = 1 where userId = ${req.body.userId}`

        if(req.body.input === 'set time'){
            db.query(sql, (err, result) => {
                if(err) throw err
                res.send({
                    result
                })
            })
        }

        else if(req.body.input === 'deadline expired'){
            db.query(sql3, (err, result) => {
                if(err) throw err
                res.send({
                    result
                })
            })
        }

        else {
            db.query(sql2, (err ,result) => {
                if(err) throw err
                db.query(sql4, (err2 , result2) => {
                    res.send({result})
                })
            })
        }
    },

    uploadPayment: (req, res) => {
        let data = JSON.parse(req.body.data)
        console.log(req.body);
        
        let sql = `update transactions set accHolderName = '${data.name}', accBank = '${data.bank}' , accNumber = '${data.number}', paymentProof = '${req.file.filename}', status = 'Waiting Approval' where userID = ${data.userId} and status = 'Pending'`
        try {
            db.query(sql, (err, result) => {
                if (err) throw err
                res.send(result)
            })   
        } catch (error) {
            fs.unlinkSync(req.file.path)
            console.log(error);
        }
    },

    changeStatus: (req,res) => {
        let sql = `update transactions set status = 'Approved' where transactionId = ${req.body.id}`

        let sql2 = `update transactions set status = 'Rejected' where transactionId = ${req.body.id}`

        if(req.body.input === 'Approve'){
            db.query(sql, (err, result) => {
                if(err) throw err
                res.send(result)
            })
        }

        else{
            db.query(sql2, (err, result) => {
                if(err) throw err
                res.send(result)
            })
        }
    },

    convertCart: (req, res) => {
        let sql = `select * from cart where userId = ${req.body.userId} and checkout = 1`

        let sql2 = `insert into orders values (0, ${req.body.transactionId}, '${req.body.addressId}', 'Pending')`

        let sql3 = `select orderId from orders where transactionId = ${req.body.transactionId}`


        db.query(sql, (err,result) => {
            if(err) throw err
            db.query(sql2, (err2, result2) => {
                if(err2) throw err2
                db.query(sql3, (err3, result3) => {
                    if(err3) throw err3
                    let sql4 = `insert into cart_orders values (0, ${result3[0].orderId} , ${req.body.cartId})`
                    db.query(sql4, (err4, result4) => {
                        if(err4) throw err4
                        res.send(result)
                    })
                })
            })
        })
    }
}
