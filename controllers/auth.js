const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports.getLogin = (req, res) => {
    res.render('front/auth/index', {
        pageTitle: "Login and Register",
        isAuth: false
    })
}

module.exports.postLogin = (req, res) => {
    const username = req.body.username
        password = req.body.password

    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.redirect('/login')
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if(result) {
                        req.session.isLoggedIn = true
                        req.session.user = user
                        return req.session.save(err => {
                            console.error('save 25', err)
                            res.redirect('/')
                        })
                    }
                    res.redirect('/login')
                })
                .catch(err => {
                    console.error('catch 30', err)
                    res.redirect('/login')
                })
        })
        .catch(err => {
            console.error('catch 35', err)
        })
}

module.exports.postRegister = (req, res) => {
    const username = req.body.username
        password = req.body.password
        confPassword = req.body.repeat-password
        email = req.body.email
        mobile = req.body.mobile

    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/login')
            }
            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            if(hashedPassword) {
            const user = new User({
                username: username,
                email: email,
                mobile: mobile,
                password: hashedPassword,
                cart: { items: [] }
            })
            return user.save()
            }
        })
        .then(result => {
            res.redirect('/login')
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.error(err)
        res.redirect('/')
    })
}