const path = require('path')
const express = require('express')

const adminControllers = require('../controllers/admin')
// const userControllers = require('../controllers/admin/user')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')

const router = express.Router()


// Dashbord
router.get('/dashboard',isAuth, isAdmin, adminControllers.dashboard)

// Home
router.get('/home',isAuth, isAdmin, adminControllers.HomePage)

// User
router.get('/users',isAuth, isAdmin, adminControllers.UserPage)
router.get('/add-user',isAuth, isAdmin, adminControllers.addUserPage)
router.post('/add-user',isAuth, isAdmin, adminControllers.addUser)
router.get('/edit-user/:id',isAuth, isAdmin, adminControllers.editUserPage)
router.post('/edit-user/:id',isAuth, isAdmin, adminControllers.editUser)
router.post('/delete-user',isAuth, isAdmin, adminControllers.deleteUser)

// Menu
router.get('/menus',isAuth, isAdmin, adminControllers.MenuPage)
router.get('/add-menu',isAuth, isAdmin, adminControllers.addMenuPage)
router.post('/add-menu',isAuth, isAdmin, adminControllers.addMenu)
router.get('/edit-menu/:id',isAuth, isAdmin, adminControllers.editMenuPage)
router.post('/edit-menu/:id',isAuth, isAdmin, adminControllers.editMenu)
router.post('/delete-menu',isAuth, isAdmin, adminControllers.deleteMenu)

// product
router.get('/list-product', isAuth, isAdmin, adminControllers.getProducts)
router.get('/add-product', isAuth, isAdmin, adminControllers.addProductPage)

router.post('/add-product', isAuth, isAdmin, adminControllers.addProduct)

router.get('/edit-product/:id', isAuth, isAdmin, adminControllers.editProductPage)
router.post('/edit-product/:id', isAuth, isAdmin, adminControllers.editProduct)

router.post('/delete-product', isAuth, isAdmin, adminControllers.deleteProduct)

// blog
router.get('/list-post', isAuth, isAdmin, adminControllers.getPosts)

router.get('/add-post', isAuth, isAdmin, adminControllers.addPostPage)

router.post('/add-post', isAuth, isAdmin, adminControllers.addPost)

module.exports = router