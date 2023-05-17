const Product = require('../models/single-product')
const Blog = require('../models/single-blog')


module.exports.dashboard = (req, res) => {
    
    Product.find()
        .then(products => {
            res.render('admin/dashboard', {
                products,
                pageTitle: 'products list'
            })
        })
    
}

module.exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
        res.render('admin/shop/list-product', {
            pageTitle: 'Products List',
            products
        })
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
    // user = req.user._id
    const product = new Product({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        brand: brand,
        category: category,
        comments: comments,
        attribute: attribute,
    })
    product.save()
        .then(result => {
            console.log('product Created!');
            res.redirect('/admin/add-product')
        })
        .catch(err => {
            console.error(err);
        })
}


module.exports.deleteProduct = (req, res) => {
    const pID = req.body.productId

    Product.findByIdAndRemove(pID)
        .then(result => {
            console.log('product Deleted!');
            res.redirect('/admin/list-product')
        })
        .catch(err => {
            console.error(err);
        })
}


module.exports.getPosts = (req, res) => {
    Blog.find()
        .then(posts => {
            res.render('admin/blog/list-post', {
                pageTitle: "Posts",
                posts: posts
            })
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.addPostPage = (req, res) => {
    res.render('admin/blog/add-post', {
        pageTitle: 'Add product'
    })
}

module.exports.addPost = (req, res) => {
    const title = req.body.title
    slug = req.body.slug
    content = req.body.content
    const post = new Blog({
        title: title,
        slug: slug,
        content: content,
    })
    post.save()
    res.redirect('/admin/dashboard')
}
