const dashbord = require('./admin/dashbord')
const user = require('./admin/user')
const home = require('./admin/home')
const blog = require('./admin/blog')
const menu = require('./admin/menu')
const product = require('./admin/product')

module.exports = {...dashbord, ...user, ...home, ...blog, ...menu, ...product}