const Blog = require('../models/single-blog')

module.exports.getBlogs = (req, res) => {
    Blog.getPosts((posts) => {
        res.render('front/blog/blog', {
            pageTitle: 'Blog',
            posts
        })
    })
    
}