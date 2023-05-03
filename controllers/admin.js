const Product = require('../models/single-product')
const Blog = require('../models/single-blog')


module.exports.dashboard = (req, res) => {
    const products = Product.getProducts()
    const posts = Blog.getPosts() 
    res.render('admin/dashboard', {
        pageTitle: 'Add product',
        products,
        posts
    })
}

module.exports.getProducts = (req, res) => {
    const products = Product.getProducts()
    res.render('admin/shop/list-product', {
        pageTitle: 'Products List',
        products
    })
}

module.exports.addProductPage = (req, res) => {
    res.render('admin/shop/add-product', {
        pageTitle: 'Add product'
    })
}

module.exports.addProduct = (req, res) => {
    // products.push({title: req.body.title})
    const title = req.body.title
    description = req.body.description
    price = req.body.price
    thumbnail = req.body.thumbnail
    brand = req.body.brand
    category = req.body.category
    comments = req.body.comments
    attribute = req.body.attribute
    const product = new Product(title, description, price, thumbnail, brand, category, comments, attribute)
    product.saveProduct()
    res.redirect('/')
}


module.exports.addPostPage = (req, res) => {
    res.render('admin/blog/add-post', {
        pageTitle: 'Add product'
    })
}

module.exports.addPost = (req, res) => {
    // products.push({title: req.body.title})
    const post = new Blog(req.body.title)
    post.savePost()
    res.redirect('/admin/dashboard')
}
