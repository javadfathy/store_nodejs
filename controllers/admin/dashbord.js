const Product = require('../../models/single-product')

// Dashboard
module.exports.dashboard = (req, res) => {
    
    Product.find()
        .then(products => {
            res.render('admin/dashboard', {
                products,
                pageTitle: 'products list',
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        })
    
}