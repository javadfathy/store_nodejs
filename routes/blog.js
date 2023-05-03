const path = require('path')
const express = require('express')

const blogControllers = require('../controllers/blog')

const router = express.Router()

// home page
router.get('/blog', blogControllers.getBlogs)


module.exports = router