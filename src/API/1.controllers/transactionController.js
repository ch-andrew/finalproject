const db = require('../database')

module.exports = {
    checkout: (req,res) => {
        let sql = `insert into transactions value (0, 0 , 0, ${req.body.userId} , ${req.body.quantity} , ${req.body.total} , 0 , 0 )`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                result
            })
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
    }
}
