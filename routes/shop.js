const path = require('path')
const express = require('express')

const shopControllers = require('../controllers/shop')

const router = express.Router()

router.get('/shop', shopControllers.getProducts)

router.get('/shop/product/:id', shopControllers.getProduct)

router.get('/cart', shopControllers.getCart)

router.post('/cart', shopControllers.addCart)

module.exports = router