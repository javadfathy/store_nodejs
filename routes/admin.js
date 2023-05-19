const path = require('path')
const express = require('express')

const adminControllers = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')

const router = express.Router()



router.get('/dashboard', adminControllers.dashboard)

// product
router.get('/list-product', isAuth, adminControllers.getProducts)
router.get('/add-product', isAuth, adminControllers.addProductPage)

router.post('/add-product', isAuth, adminControllers.addProduct)

router.post('/delete-product', isAuth, adminControllers.deleteProduct)

// blog
router.get('/list-post', isAuth, adminControllers.getPosts)

router.get('/add-post', isAuth, adminControllers.addPostPage)

router.post('/add-post', isAuth, adminControllers.addPost)

module.exports = router