const Product = require('../models/single-product')
const Menu = require('../models/single-menu')

module.exports.getProducts = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        Product.find()
            .then(products => {
                res.render('front/shop/products', {
                    products,
                    pageTitle: 'محصولات',
                    headerMenu: headerMenu,
                    isAuth: req.session.isLoggedIn,
                    isAdmin: req.session.isAdmin || false
                })
            })
            .catch(err => {
                console.error(err);
            })
    }).catch(err => {
        console.error(err)
    })
}

module.exports.getProduct = (req, res) => {
    const pID = req.params.id
    Menu.findOne({location: 'header'}).then(headerMenu => {
        Product.findById(pID)
            .then(product => {
                res.render('front/shop/product', {
                    product,
                    pageTitle: 'product.title',
                    headerMenu: headerMenu,
                    isAuth: req.session.isLoggedIn,
                    isAdmin: req.session.isAdmin || false
                })
            })
            .catch(err => {
                console.error(err);
            })
    }).catch(err => {
        console.error(err)
    })
}

module.exports.getCart = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        req.user.populate('cart.items.productId')
            .then(user => {
                const products = user.cart.items
                console.log(user.cart)
                res.render('front/shop/cart', {
                    pageTitle: "Cart Page",
                    products: products,
                    headerMenu: headerMenu,
                    isAuth: req.session.isLoggedIn,
                    isAdmin: req.session.isAdmin || false
                })
            })
            .catch(err => {
                console.error(err);
            })
    }).catch(err => {
        console.error(err)
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