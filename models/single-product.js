const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    category: String,
    brand: String,
    comments: Boolean,
    attribute: String,
    spicifics: Array,
    content: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Product', productSchema)