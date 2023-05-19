const path = require('path')
const express = require('express')

const authControllers = require('../controllers/auth')

const router = express.Router()

router.get('/login', authControllers.getLogin)

router.post('/login', authControllers.postLogin)

router.post('/register', authControllers.postRegister)

router.post('/logout', authControllers.postLogout)

module.exports = router