const Product = require('../models/single-product')

module.exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render('front/shop/products', {
                products,
                pageTitle: 'محصولات',
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.getProduct = (req, res) => {
    const pID = req.params.id
    
    Product.findById(pID)
        .then(product => {
            res.render('front/shop/product', {
                product,
                pageTitle: 'product.title',
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.getCart = (req, res) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items
            console.log(user.cart)
            res.render('front/shop/cart', {
                pageTitle: "Cart Page",
                products: products,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.addCart = (req, res) => {
    const pID = req.body.productId
    Product.findById(pID)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/shop')
        })
}