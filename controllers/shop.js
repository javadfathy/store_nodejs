const Product = require('../models/single-product')

module.exports.getProducts = (req, res) => {
    Product.Rproducts()
        .then(products => {
            res.render('front/shop/products', {
                products,
                pageTitle: 'محصولات'
            })
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.getProduct = (req, res) => {
    const pID = req.params.id
    
    Product.Rproduct(pID)
        .then(product => {
            res.render('front/shop/product', {
                product,
                pageTitle: 'product.title'
            })
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.getCart = (req, res) => {
    res.render('front/shop/cart', {
        pageTitle: 'Cart'
    })
}

module.exports.addCart = (req, res) => {
    const pID = req.body.productId
    Product.Rproduct(pID)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            res.redirect('/shop')
        })
}