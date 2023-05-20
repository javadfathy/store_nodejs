const User = require('../models/user')

module.exports = (req, res, next) => {
    console.log(req.user.roll)
    if (req.user.roll !== 'admin') {
        return res.redirect('/login')
    }
    next()
}