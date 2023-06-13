const User = require('../../models/user')

// User
module.exports.UserPage = (req, res) => {
    User.find()
        .then(users => {
            res.render('admin/user/list-user', {
                pageTitle: 'Users',
                users: users,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.addUserPage = (req, res) => {
    res.render('admin/user/add-user', {
        pageTitle: 'add User',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

module.exports.addUser = (req, res) => {
    const dataUser = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        roll: req.body.roll,
        cart: {items: []}
    }
    const user = new User(dataUser)
    user.save()
        .then(result => {
            res.redirect('/admin/add-user')
        }).catch(err => {
            console.error(err)
        })
}

module.exports.editUserPage = (req, res) => {
    const uID = req.params.id
    User.findById({_id: uID})
        .then(user => {
            res.render('admin/user/edit-user', {
                pageTitle: 'Edit user',
                user: user,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.editUser = (req, res) => {
    const uID = req.params.id
    const userUpdateData = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        roll: req.body.roll,
    }
    User.findOneAndUpdate({_id: uID}, userUpdateData)
        .then(result => {
            res.redirect(`admin/user/edit-user/${uID}`)
        }).catch(err => {
            console.error(err)
        })
}

module.exports.deleteUser = (req, res) => {
    const uID = req.body.userId
    
    User.deleteOne({_id: uID})
        .then(result => {
            res.redirect('admin/user/list-user')
        }).catch(err => {
            console.error(err)
        })
}
