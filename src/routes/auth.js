const path = require('path')
const express = require('express')
const { check } = require('express-validator')

const authControllers = require('../controllers/auth')

const router = express.Router()

router.get('/login', authControllers.getLogin)

router.post('/login', authControllers.postLogin)

router.post('/register',
    check('email').isEmail().withMessage("Please Enter a valid email"),
    check('password').isLength({ min: 4 })
        .withMessage('password is very low'),
    check('repeat-password').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('confirm password is not valid!')
        else
            return true
    }),
    authControllers.postRegister)

router.post('/logout', authControllers.postLogout)

module.exports = router