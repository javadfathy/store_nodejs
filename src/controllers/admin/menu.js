const Menu = require('../../models/single-menu')

// Menu
module.exports.MenuPage = (req, res) => {
    Menu.find()
        .then(menus => {
            res.render('admin/menu/list-menu', {
                pageTitle: 'Menus',
                menus: menus,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.addMenuPage = (req, res) => {
    res.render('admin/menu/add-menu', {
        pageTitle: 'Add menu',
        isAuth: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin || false
    })
}

module.exports.addMenu = (req, res) => {
    const menuData = {
        location: req.body.location,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        icon: req.body.icon,
        userId: req.user
    }

    const menu = new Menu(menuData)
    menu.save()
        .then(result => {
            res.redirect('/admin/add-menu')
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports.editMenuPage = (req, res) => {
    const mID = req.params.id
    Menu.findById(mID)
        .then(menu => {
            res.render('admin/menu/edit-menu', {
                pageTitle: 'Edit menu',
                menu: menu,
                isAuth: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin || false
            })
        }).catch(err => {
            console.error(err)
        })
}

module.exports.editMenu = (req, res) => {
    const mID = req.params.id
    const menuData = {
        location: req.body.location,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        icon: req.body.icon
    }
    Menu.findOneAndUpdate({ _id: mID}, menuData)
        .then(result => {
            res.redirect(`/admin/edit-menu/${mID}`)
        }).catch(err => {
            console.error(err)
        })
}

module.exports.deleteMenu = (req, res) => {
    const mID = req.body.menuId
    Menu.deleteOne({_id: mID, userId: req.user._id})
        .then(result => {
            res.redirect('/admin/menus')
        }).catch(err => {
            console.error(err);
        })
}