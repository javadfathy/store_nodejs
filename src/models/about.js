const mongoose = require('mongoose')
const Schema = mongoose.Schema

const about = new Schema({
    title: String,
    description: String,
    image: String,
    
})

module.exports = mongoose.model('About', about)