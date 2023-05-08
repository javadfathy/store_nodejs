const Product = require('../models/single-product')

module.exports.getProducts = (req, res) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    const products = Product.getProducts()
    console.log(products)
    res.render('front/shop/products', {
        pageTitle: 'Home',
        products
    })
}

module.exports.getProduct = (req, res) => {
    const pTitle = req.params.title
    
    const product = Product.getProduct(pTitle)
    console.log('getProduct: ', product)
    res.render('front/shop/product', {
        pageTitle: pTitle,
        product
    })
}