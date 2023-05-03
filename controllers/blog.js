const Blog = require('../models/single-blog')

module.exports.getBlogs = (req, res) => {
    const posts = Blog.getPosts()
    res.render('front/blog/blog', {
        pageTitle: 'Blog',
        posts
    })
}