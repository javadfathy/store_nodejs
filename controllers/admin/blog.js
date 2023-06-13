const Blog = require('../../models/single-blog')

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
