const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

class Product {
    constructor(title, description, price, thumbnail, category, brand, comments, attribute) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.category = category
        this.brand = brand
        this.comments = comments
        this.attribute = attribute
    }


    // CRUD...
    static Rproducts() {
        const db = getDB()
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products
            })
            .catch(err => {
                console.error(err)
            })
    }

    static Rproduct(pID) {
        const db = getDB()
        return db.collection('products')
            .find({_id: new mongodb.ObjectId(pID)})
            .next()
            .then(product => {
                return product
            })
            .catch(err => {
                console.error(err);
            })
    }

    Cproduct() {
        const db = getDB()
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.error(err);
            })
    }
}


module.exports = Product