const db = require('../database')

module.exports = {
    getList: (req, res) => {

        let sql = `select id, products.name, description, c.name as category, gender, color, image, IDR, SGD, MYR from products
                    join pictures p on p.productId = products.id
                    join prices pr on pr.productId = products.id
                    join categories c on c.catId = products.categoryId`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                products : result
            })
        })  
        
    },

    getProducts: (req, res) => {
        let sql = `select id, products.name, description, c.name as category, gender, defaultImage from products
                    join categories c on c.catId = products.categoryId`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                products : result
            })
        })
    },
    
    getExistingProduct: (req, res) => {
        let sql = `select name, id from products`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                existingProducts : result
            })
        })
    },
}