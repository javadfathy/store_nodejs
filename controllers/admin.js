const Product = require('../models/single-product')
const Blog = require('../models/single-blog')
const Menu = require('../models/single-menu')


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

// Home
module.exports.HomePage = (req, res) => {
    res.render('admin/home/index', {
        pageTitle: 'Home',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

// User
module.exports.UserPage = (req, res) => {
    res.render('admin/user/list-user', {
        pageTitle: 'Users',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

// Menu
module.exports.MenuPage = (req, res) => {
    Menu.find()
        .then(menus => {
            res.render('admin/menu/list-menu', {
                pageTitle: 'Menus',
                menus: menus,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.addMenuPage = (req, res) => {
    res.render('admin/menu/add-menu', {
        pageTitle: 'Add menu',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

module.exports.addMenu = (req, res) => {
    const menuData = {
        location: req.body.location,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        icon: req.body.icon,
        userId: req.user
    }

    const menu = new Menu(menuData)
    menu.save()
        .then(result => {
            res.redirect('/admin/add-menu')
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.editMenuPage = (req, res) => {
    const mID = req.params.id
    Menu.findById(mID)
        .then(menu => {
            res.render('admin/menu/edit-menu', {
                pageTitle: 'Edit menu',
                menu: menu,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.editMenu = (req, res) => {
    const mID = req.params.id
    const menuData = {
        location: req.body.location,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        icon: req.body.icon
    }
    Menu.findOneAndUpdate({ _id: mID}, menuData)
        .then(result => {
            res.redirect(`/admin/edit-menu/${mID}`)
        }).catch(err => {
            console.error(err)
        })
}

module.exports.deleteMenu = (req, res) => {
    const mID = req.body.menuId
    Menu.deleteOne({_id: mID, userId: req.user._id})
        .then(result => {
            res.redirect('/admin/menus')
        }).catch(err => {
            console.error(err);
        })
}
// Product
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
