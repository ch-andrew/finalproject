const db = require('../database')

module.exports = {
    getList: (req, res) => {

        let sql = `select id, products.name, description, c.name as category, gender, color, image, IDR, SGD, MYR from products
                    join variants v on v.productId = products.id
                    join prices p on p.productId = products.id
                    join categories c on c.catId = products.categoryId`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                status : '200',
                products : result
            })
        })  
        
    },

    getProducts: (req, res) => {
        let sql = `select id, products.name, description, c.name as category, gender, IDR, SGD, MYR, defaultImage from products
                    join prices p on p.productId = products.id
                    join categories c on c.catId = products.categoryId`

        let newArrivals = `select id, products.name, description, c.name as category, gender, IDR, SGD, MYR, defaultImage from products
                            join prices p on p.productId = products.id
                            join categories c on c.catId = products.categoryId
                            order by dateAdded desc limit 4;`

        if(req.query.input === 'New Arrivals'){
            db.query(newArrivals, (err, result) => {
                if(err) throw err
                res.send({
                    status : '200',
                    new : result
                })
            })
        }

        else {

            db.query(sql, (err,result) => {
                if(err) throw err
                res.send({
                    status : '200',
                    products : result
                })
            })
        }

    },

    getMenProducts: (req, res) => {
        let sql = `select id, products.name, description, c.name as category, gender, IDR, SGD, MYR, defaultImage from products 
                    join prices p on p.productId = products.id
                    join categories c on c.catId = products.categoryId
                    where categoryId in (select catId from categories where gender = 'Men')`
        
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                status : '200',
                products : result
            })
        })
    },

    getWomenProducts: (req, res) => {
        let sql = `select id, products.name, description, c.name as category, gender, IDR, SGD, MYR, defaultImage from products 
                    join prices p on p.productId = products.id
                    join categories c on c.catId = products.categoryId
                    where categoryId in (select catId from categories where gender = 'Women')`
        
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                status : '200',
                products : result
            })
        })
    },

    getProduct: (req, res) => {
        let sql = `select name, description, categoryId, IDR, MYR, SGD from products
                    join prices p on p.productId = products.id
                    where products.id = ${req.params.id}`

        let sql2 = `select v.productId, color, colorCodes, image, variantId from products
                    join prices p on p.productId = products.id
                    join variants v on v.productId = products.id
                    where products.id = ${req.params.id}`
        

        db.query(sql, (err, result) => {
            if(err) throw err
            db.query(sql2, (err2, result2) => {
                if(err2) throw err2
                res.send({
                    status: '200',
                    product: result,
                    variants : result2
                })
            })
        })
    },

    getVariant: (req, res) => {
        let sql = `select * from variants where color = ${req.body.color}`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                variant : result
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

    getOptions : (req, res) => {
        let sql = `select name from categories group by name`
        let sql2 = `select gender from categories group by gender`

        db.query(sql, (err, result) => {
            if(err) throw err
            db.query(sql2, (err2, result2) => {
                if(err2) throw err2
                res.send({
                    categories: result,
                    genders: result2
                })
            })
        })
    },

    getPrice : (req,res) => {
        let sql = `select * from prices
                    join products p on p.id = prices.productId
                    where p.id = ${req.params.id}`

        db.query(sql, (err,result) => {
            if(err) throw err
            res.send({
                price : result
            })
        })
    },

    addProduct : (req, res) => {
        if(req.body.input_product === 'New'){
            let getCatID = `select catId from categories where name = '${req.body.category}' and gender = '${req.body.gender}'` 

            let checkName = `select name from products where name = '${req.body.name}'`

            db.query(checkName, (err, result) => {
                if(err) throw err
                if(result){
                    db.query(getCatID, (err2, result2) => {
                        if(err2) throw err2
                        if(result2){
                            let add = `insert into products value (0, '${req.body.name}', '${req.body.description}', '${req.body.defaultImage}', ${result2[0].catId} , '${req.body.date}')`
                            db.query(add, (err3, result3) => {
                                if(err3) throw err3
                                if(result3){
                                    let getId = `select id from products where name = '${req.body.name}'`
                                    db.query(getId, (err4, result4) => {
                                        if(err4) throw err4
                                        if(result4){
                                            let addPrice = `insert into prices value (0, '${req.body.price_IDR}', '${req.body.price_MYR}', '${req.body.price_SGD}', ${result4[0].id})`
                                            db.query(addPrice, (err5, result5) => {
                                                if(err5) throw err5
                                                if(result5){
                                                    let addVariant = `insert into variants value (0, '${req.body.color}', '${req.body.color_codes}', '${req.body.image}' , ${result4[0].id})`
                                                    db.query(addVariant, (err6, result6) => {
                                                        if(err6) throw err6
                                                        res.send({
                                                            status: '201',
                                                            message: 'New product is added succesfully.',
                                                            result6
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        
                    })
                }
                else {
                    res.send({
                        status: '406',
                        message: 'Product with the same name already exists !. Please try again with different name.'
                    })
                }
            })
            
        }

        else {
            let getProdId = `select id from products where name = '${req.body.existing_product}'`
            
            db.query(getProdId, (err, result)=>{
                if(err) throw err
                if(result){
                    let addVariant = `insert into variants value (0, '${req.body.color}', '${req.body.color_codes}', '${req.body.image}' , ${result[0].id})`
                    db.query(addVariant, (err2, result2)=>{
                        if(err2) throw err2
                        res.send({
                            status: '201',
                            message: 'Product Variant is added succesfully.',
                            result2
                        })
                    })
                }
            })
        }
    },

    test : (req, res) => {
        let sql = `select id from products where name = 'Sketchy Cat Skull'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send(
                result
            )
        })
    },

}