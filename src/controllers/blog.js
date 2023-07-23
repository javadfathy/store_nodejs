const Blog = require('../models/single-blog')
const Menu = require('../models/single-menu')

module.exports.getBlogs = (req, res) => {
    Menu.findOne({location: 'header'}).then(headerMenu => {
        Blog.find()
            .then(posts => {
                res.render('front/blog/blog', {
                    pageTitle: 'Blog',
                    posts,
                    headerMenu: headerMenu,
                    isAuth: req.session.isLoggedIn || false,
                    isAdmin: req.session.isAdmin || false
                })
            })
            .catch(err => {
                console.error(err)
            })
    }).catch(err => {
        console.error(err)
    })
}

module.exports.getBlog = (req, res) => {
    const pId = req.params.id
    Menu.findOne({location: 'header'}).then(headerMenu => {
        Blog.findById(pId)
            .then(post => {
                res.render('front/blog/single', {
                    pageTitle: post.title,
                    post,
                    headerMenu: headerMenu,
                    isAuth: req.session.isLoggedIn || false,
                    isAdmin: req.session.isAdmin || false
                })
            })
            .catch(err => {
                console.error(err);
            })
    }).catch(err => {
        console.error(err)
    })
}