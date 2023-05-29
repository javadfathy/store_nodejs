const Product = require('../models/single-product')

module.exports.getHome = (req, res) => {
    Product.find()
        .then(products => {
            res.render('front/index', {
                pageTitle: 'Home',
                products: products,
                isAuth: req.session.isLoggedIn || false,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}