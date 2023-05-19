const User = require('../models/user')

module.exports.getLogin = (req, res) => {
    res.render('front/auth/index', {
        pageTitle: "Login and Register",
        isAuth: false
    })
}

module.exports.postLogin = (req, res) => {
    User.findById('64654217fbda88a08a2abcad')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save(err => {
                console.error(err)
                res.redirect('/')
            })
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.postRegister = (req, res) => {
    
}

module.exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.error(err)
        res.redirect('/')
    })
}