const Product = require('../models/single-product')
const Blog = require('../models/single-blog')


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

module.exports.getProducts = (req, res) => {
    Product.find({ userId: req.user._id })
        .then(products => {
        res.render('admin/shop/list-product', {
            pageTitle: 'Products List',
            products,
            isAuth: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin || false
        })
    })
}

module.exports.addProductPage = (req, res) => {
    res.render('admin/shop/add-product', {
        pageTitle: 'Add product',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

module.exports.addProduct = (req, res) => {
    const productData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        comments: req.body.comments,
        attribute: req.body.attribute,
        spicifics: req.body.spicific,
        userId: req.user
    }
    if (req.file) {
        productData.thumbnail = req.file.path
    }
    const product = new Product(productData)
    product.save()
        .then(result => {
            console.log('product Created!');
            res.redirect('/admin/add-product')
        })
        .catch(err => {
            console.error(err);
        })
}

module.exports.editProductPage = (req, res) => {
    const pID = req.params.id
    
    Product.findById(pID).then(product => {
        res.render('admin/shop/edit-product', {
            pageTitle: 'Edit product',
            product: product,
            isAuth: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin || false
        })
    })
}

module.exports.editProduct = (req, res) => {
    const pID = req.params.id
    const productUpdated = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        comments: req.body.comments,
        attribute: req.body.attribute,
        spicifics: req.body.spicific,
    }
    if (req.file) {
        productUpdated.thumbnail = req.file.path
    }
    Product.findOneAndUpdate({ _id: pID }, { ...productUpdated })
        .then(result => {
            console.log('product Updated!');
            res.redirect(`/admin/edit-product/${pID}`)
        }).catch(err => {
            console.error(err);
        })
}


module.exports.deleteProduct = (req, res) => {
    const pID = req.body.productId

    Product.deleteOne({ _id: pID, userId: req.user._id})
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
                posts: posts,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.addPostPage = (req, res) => {
    res.render('admin/blog/add-post', {
        pageTitle: 'Add product',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
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
