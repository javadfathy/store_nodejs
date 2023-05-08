const path = require('path')
const express = require('express')

const shopControllers = require('../controllers/shop')

const router = express.Router()

router.get('/shop', shopControllers.getProducts)

router.get('/shop/product/:title', shopControllers.getProduct)

module.exports = router