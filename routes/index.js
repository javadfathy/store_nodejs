const path = require('path')
const express = require('express')

const indexControllers = require('../controllers/index')

const router = express.Router()

// home page
router.get('/', indexControllers.getHome)


module.exports = router