const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactForm = new Schema({
    name: String,
    email: String,
    subject: String,
    phone: String,
    message: String
})

module.exports = mongoose.model('contactForm', contactForm)