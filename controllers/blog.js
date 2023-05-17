const Blog = require('../models/single-blog')

module.exports.getBlogs = (req, res) => {
    Blog.find()
    .then(posts => {
        res.render('front/blog/blog', {
            pageTitle: 'Blog',
            posts
        })
    })
    .catch(err => {
        console.error(err)
    })
}

module.exports.getBlog = (req, res) => {
    const pId = req.params.id
    Blog.findById(pId)
        .then(post => {
            res.render('front/blog/single', {
                pageTitle: post.title,
                post
            })
        })
        .catch(err => {
            console.error(err);
        })

}