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
        let sql = `select * from transactions where userId = ${req.query.userId} and (status = 'Pending' or status = 'Waiting Approval' or status = 'On Shipment')`

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
                if(result){
                    console.log(result);
                    
                    db.query(sql4, (err2 , result2) => {
                        if(err2) throw err2
                        res.send({result})
                    })
                }
            })
        }
    },

    uploadPayment: (req, res) => {
        let data = JSON.parse(req.body.data)
        
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
        let sql = `update transactions set status = 'Approved' where transactionId = ${req.body.tId}`

        let sql2 = `update transactions set status = 'Rejected' where transactionId = ${req.body.tId}`

        let sql3 = `delete from transactions where transactionId = ${req.body.tId} and status = 'Rejected'`

        let sql4 = `update orders set shippingStatus = 'On Process' where transactionId = ${req.body.tId}`

        let sql5 = `update transactions set status = 'On Shipment' where transactionId = ${req.body.tId}`

        
        let sql6 = `delete from orders where transactionId = ${req.body.tId}`
        
        let sql7 = `update transactions set status = 'Completed' where transactionId = ${req.body.tId}`

        if(req.body.input === 'Approve'){
            db.query(sql, (err, result) => {
                if(err) throw err
                res.send(result)
            })
        }

        if(req.body.input === 'Reject' ){
            db.query(sql2, (err, result) => {
                if(err) throw err
                res.send(result)
            })
        }

        if(req.body.input === 'Delete' ){
            db.query(sql3, (err, result) => {
                if(err) throw err
                res.send(result)
            })
        }

        if(req.body.input === 'Ship'){
            db.query(sql4, (err, result) => {
                if(err) throw err
                if(result){
                    db.query(sql5, (err2, result2) => {
                        if(err2) throw err2
                        res.send(result2)
                    })
                }
            })
        }

        if(req.body.input === 'Complete'){
            db.query(sql6, (err, result) => {
                if(err) throw err
                if(result){
                    db.query(sql7, (err2, result2) => {
                        if(err2) throw err2
                        res.send(result2)
                    })
                }
            })
        }
    },

    checkOrders: (req, res) => {
        let sql = `select * from orders where transactionId = ${req.body.transactionId}`

        db.query(sql, (err, result)=> {
            if(err) throw err
            res.send(result)
        })
    },

    getCheckoutCart: (req, res) => {
        let sql = `select * from cart where userId = ${req.query.userId}`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    },

    addOrder: (req, res) => {
        let sql = `insert into orders values (0, ${req.body.transactionId}, '${req.body.addressId}', 'Pending')`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    },

    convertCart: (req, res) => {
        let sql = `select orderId from orders where transactionId = ${req.body.transactionId}`

        db.query(sql, (err, result) => {
            if(err) throw err
            if(result){
                let sql2 = `insert into cart_orders values (0, ${result[0].orderId} , ${req.body.cartId})`
                db.query(sql2, (err2 ,result2) => {
                    if(err2) throw err2
                    res.send(result2)
                })
            }
        })
    },

    getOrders: (req,res) => {
        console.log(req.query);
        
        let sql = `select transactionId from transactions where userId = ${req.query.userId}`

        db.query(sql, (err, result) => {
            if(err) throw err
            console.log(result[0]);
            
            if(result[0]){
                let sql2 = `select * from orders o
                            join cart_orders co on co.orderId = o.orderId
                            join cart c on c.cartId = co.cartId
                            join variants v on v.variantId = c.variantId
                            join products p on p.id = v.productId
                            where transactionId = ${result[0].transactionId}`
                db.query(sql2, (err2, result2)=> {
                    if(err2) throw err2
                    res.send(result2)
                })
            }
        })
    }
}
