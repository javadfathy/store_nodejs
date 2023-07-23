const path = require('path')
const express = require('express')

const shopControllers = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/shop', shopControllers.getProducts)

router.get('/shop/product/:id', shopControllers.getProduct)

router.get('/cart', isAuth, shopControllers.getCart)

router.post('/cart', isAuth, shopControllers.addCart)

module.exports = router