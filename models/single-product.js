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
})


module.exports = mongoose.model('Product', productSchema)

// const mongodb = require('mongodb')
// const getDB = require('../util/database').getDB

// class Product {
//     constructor(title, description, price, thumbnail, category, brand, comments, attribute, user) {
//         this.title = title
//         this.description = description
//         this.price = price
//         this.thumbnail = thumbnail
//         this.category = category
//         this.brand = brand
//         this.comments = comments
//         this.attribute = attribute
//         this.user = user
//     }


//     // CRUD...
//     static Rproducts() {
//         const db = getDB()
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 return products
//             })
//             .catch(err => {
//                 console.error(err)
//             })
//     }

//     static Rproduct(pID) {
//         const db = getDB()
//         return db.collection('products')
//             .find({_id: new mongodb.ObjectId(pID)})
//             .next()
//             .then(product => {
//                 return product
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }

//     Cproduct() {
//         const db = getDB()
//         return db.collection('products')
//             .insertOne(this)
//             .then(result => {
//                 console.log(result)
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }

//     static Dproduct(pID) {
//         const db = getDB()
//         return db.collection('products')
//             .deleteOne({_id: new mongodb.ObjectId(pID)})
//             .then(result => {
//                 console.log('Product Deleted!!s')
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }
// }


// module.exports = Product