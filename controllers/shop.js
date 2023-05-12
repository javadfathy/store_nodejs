const Product = require('../models/single-product')

module.exports.getProducts = (req, res) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    Product.getProducts((products) => {
        console.log(products)
        res.render('front/shop/products', {
            pageTitle: 'Home',
            products
        })
    }) 
}

module.exports.getProduct = (req, res) => {
    const pTitle = req.params.title
    
    Product.getProduct(pTitle, (product) => {
        console.log('getProduct: ', product)
        res.render('front/shop/product', {
            pageTitle: pTitle,
            product
        })
    })
}

module.exports.getCart = (req, res) => {
    res.render('front/shop/cart', {
        pageTitle: 'Cart'
    })
}

module.exports.addCart = (req, res) => {
    const pID = req.body.productId
    console.log(pID)
    res.redirect('/shop')
}