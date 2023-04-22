const path = require('path')
const express = require('express')

const productControllers = require('../controllers/products')

const router = express.Router()



router.get('/add-product', productControllers.addProductPage)

router.post('/add-product', productControllers.addProduct)

// module.exports = router

module.exports = router