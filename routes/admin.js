const path = require('path')
const express = require('express')

const adminControllers = require('../controllers/admin')

const router = express.Router()



// router.get('/dashboard', adminControllers.dashboard)

// product
// router.get('/list-product', adminControllers.getProducts)
router.get('/add-product', adminControllers.addProductPage)

router.post('/add-product', adminControllers.addProduct)

// router.post('/delete-product', adminControllers.deleteProduct)

// blog
router.get('/add-post', adminControllers.addPostPage)

router.post('/add-post', adminControllers.addPost)

// module.exports = router

module.exports = router