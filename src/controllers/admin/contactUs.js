module.exports.contactUs = (req, res) => {
    res.render('admin/contactUs/index', {
        pageTitle: 'contact Us',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}