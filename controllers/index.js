const Product = require('../models/single-product')
const Menu = require('../models/single-menu')

module.exports.getHome = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        Product.find()
        .then(products => {
            res.render('front/index', {
                pageTitle: 'Home',
                products: products,
                headerMenu: headerMenu,
                isAuth: req.session.isLoggedIn || false,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
    }).catch(err => {
        console.error(err)
    })
    
    
}