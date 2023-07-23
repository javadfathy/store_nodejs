const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    location: String,
    type: String,
    title: Array,
    link: Array,
    icon: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Menu', menuSchema)