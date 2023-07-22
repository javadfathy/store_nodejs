const dashbord = require('./admin/dashbord')
const user = require('./admin/user')
const home = require('./admin/home')
const blog = require('./admin/blog')
const menu = require('./admin/menu')
const product = require('./admin/product')
const contactUs = require('./admin/contactUs')
const aboutUs = require('./admin/aboutUs')

module.exports = {...dashbord, ...user, ...home, ...blog, ...menu, ...product, ...contactUs, ...aboutUs}