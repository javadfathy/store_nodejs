
module.exports.getHome = (req, res) => {
    res.render('front/index', {
        pageTitle: 'Home',
        isAuth: req.session.isLoggedIn || false
    })
}