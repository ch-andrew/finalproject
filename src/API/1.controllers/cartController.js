const db = require('../database')

module.exports = {
    getCart : (req,res) => {
        let sql = `select cartId, userId, v.variantId, priceId, quantity, size, color, image, p.name, p.id, c.name as category, gender, categoryId from cart
                    join variants v on v.variantId = cart.variantId
                    join products p on p.id = v.productId
                    join categories c on c.catId = p.categoryId
                    where userId = ${req.query.userId} and checkout = 0 order by variantId asc`

        let sql2 = `select cartId, userId, v.variantId, priceId, quantity, size, color, image, p.name, p.id, c.name as category, gender, categoryId from cart
                    join variants v on v.variantId = cart.variantId
                    join products p on p.id = v.productId
                    join categories c on c.catId = p.categoryId
                    where userId = ${req.query.userId} and checkout = 1 order by variantId asc`

        if(req.query.input === 'checkout cart'){
            db.query(sql2, (err, result) => {
                if(err) throw err
                if(result){
                    res.send({
                        status: '200',
                        success: `Cart with userId : ${req.query.userId} is retrieved`,
                        cart: result,
                    })
                }
            })
        }

        else {

            db.query(sql, (err, result) => {
                if(err) throw err
                if(result){
                    res.send({
                        status: '200',
                        success: `Cart with userId : ${req.query.userId} is retrieved`,
                        cart: result,
                    })
                }
            })
        }

    },

    addToCart : (req, res) => {
        console.log(req.body);
        
        let sql = `insert into cart values (0, ${req.body.userId}, ${req.body.variantId}, ${req.body.pricesId}, ${req.body.quantity} , '${req.body.size}' , 0)`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                status: '201',
                success: 'Product has been added to your cart'
            })
        })
    },

    addQuantity : (req, res) => {
        let sql = `update cart set quantity = quantity + ${req.body.quantity} where variantId = '${req.body.variantId}' and size = '${req.body.size}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                status: '201',
                success: 'Product has been added to your cart'
            })
        })
    },

    quantityChange : (req, res) => {
        let sql = `update cart set quantity = ${req.body.quantity} where cartId = '${req.body.cartId}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                status: '201',
                success: 'Quantity has been changed'
            })
        })
    },

    countSubtotal : (req, res) => {
        let sql = `select IDR, MYR, SGD, quantity, sum(IDR * quantity) as TotalIDR, sum(MYR * quantity) as TotalMYR, sum(SGD * quantity) as TotalSGD from prices
                    join cart c on c.priceId = prices.pricesId
                    where userId = ${req.query.userId} and checkout = 0`
        
        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                subtotal: result
            })
        })
    },

    removeItem : (req, res) => {
        let sql = `delete from cart where cartId = '${req.body.cartId}'`

        db.query(sql, (err, result) => {
            if(err) throw err
            res.send({
                result
            })
        })
    }
}