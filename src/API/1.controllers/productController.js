const db = require('../database')

module.exports = {
    getProducts: (req, res) => {

        let sql = `select id, products.name, description, c.name as category, gender from products
                    join categories c on c.catId = products.categoryId`

        db.query(sql, (err,result) => {
            if(err) throw err
            if(result){
                let sql2 = `select id, color, image, IDR, SGD, MYR from products
                            join pictures p on p.productId = products.id
                            join prices pr on pr.productId = products.id`
                db.query(sql2, (err2, result2) => {
                    if(err2) throw err2
                    res.send({
                        status : '200',
                        products : result,
                        variants : result2
                    })
                })
            }  
        })  
        
    },

}