const path = require('path')
const express = require('express')

const indexControllers = require('../controllers/index')

const router = express.Router()

// home page
router.get('/', indexControllers.getHome)

router.get('/about-us', indexControllers.getAboutUs)
router.get('/contact-us', indexControllers.getContactUs)


module.exports = router