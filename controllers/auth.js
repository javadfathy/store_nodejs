module.exports.getLogin = (req, res) => {
    const isLoggedIn = req.get('Cookie')
    res.render('front/auth/index', {
        pageTitle: "Login and Register",
        isAuth: isLoggedIn
    })
}

module.exports.postLogin = (req, res) => {
    res.setHeader('Set-Cookie','loggedIn=true')
    res.redirect('/shop')
}
