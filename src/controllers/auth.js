const User = require('../models/user')
const Menu = require('../models/single-menu')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

module.exports.getLogin = (req, res) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    Menu.findOne({location: 'header'}).then(headerMenu => {
        res.render('front/auth/index', {
            pageTitle: "Login and Register",
            isAuth: false,
            isAdmin: req.session.isAdmin || false,
            headerMenu: headerMenu,
            errorMessage: message,
            inputData: {
                username: '',
                password: null,
                confPassword: null,
                email: '',
                mobile: '',
            }
        })
    }).catch(err => {
        console.error(err)
    })
}

module.exports.postLogin = (req, res) => {
    const username = req.body.username
        password = req.body.password

    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                req.flash('error', 'email or password is not currect!')
                return res.redirect('/login')
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if(result) {
                        req.session.isLoggedIn = true
                        req.session.user = user
                        console.log(req.session.user.roll)
                        if (req.session.user.roll === 'admin') {
                            req.session.isAdmin = true
                        }
                        return req.session.save(err => {
                            console.error('save 25', err)
                            res.redirect('/')
                        })
                    } else {
                        req.flash('error', 'email or password is not currect!')
                        res.redirect('/login')
                    }
                    
                })
                .catch(err => {
                    req.flash('error', 'Server error')
                    console.error('catch 30', err)
                    res.redirect('/login')
                })
        })
        .catch(err => {
            req.flash('error', 'email or password is not currect!')
            console.error('catch 35', err)
        })
}

module.exports.postRegister = (req, res) => {
    const username = req.body.username
        password = req.body.password
        confPassword = req.body.repeat-password
        email = req.body.email
        mobile = req.body.mobile
        roll = 'user'
        errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(422).render('front/auth/index', {
                pageTitle: "Login and Register",
                isAuth: false,
                isAdmin: req.session.isAdmin || false,
                errorMessage: errors.array()[0].msg,
                inputData: {
                    username: username,
                    password: password,
                    confPassword: confPassword,
                    email: email,
                    mobile: mobile,
                }
            })
        }
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'user has in website, please login!')
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
                roll: roll,
                cart: { items: [] }
            })
            return user.save()
            }
        })
        .then(result => {
            req.flash('error', 'user has in website, please login!')
            res.redirect('/login')
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.error(err)
        res.redirect('/login')
    })
}