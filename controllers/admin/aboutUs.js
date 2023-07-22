module.exports.aboutUs = (req, res) => {
    res.render('admin/aboutUs/index', {
        pageTitle: 'About Us',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}