const Product = require('../models/single-product')

module.exports.addProductPage = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add product'
    })
}

module.exports.addProduct = (req, res) => {
    // products.push({title: req.body.title})
    const product = new Product(req.body.title)
    product.saveProduct()
    res.redirect('/')
}

module.exports.getProducts = (req, res) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    const products = Product.getProducts()
    res.render('shop', {
        pageTitle: 'Home',
        products
    })
}