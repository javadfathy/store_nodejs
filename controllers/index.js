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

module.exports.getAboutUs = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        res.render('front/about-us/index', {
            pageTitle: 'Home',
            headerMenu: headerMenu,
            isAuth: req.session.isLoggedIn || false,
            isAdmin: req.session.isAdmin || false
        })
    })
}
module.exports.getContactUs = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        res.render('front/contact-us/index', {
            pageTitle: 'Home',
            headerMenu: headerMenu,
            isAuth: req.session.isLoggedIn || false,
            isAdmin: req.session.isAdmin || false
        })
    })
}