// Home
module.exports.HomePage = (req, res) => {
    res.render('admin/home/index', {
        pageTitle: 'Home',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}