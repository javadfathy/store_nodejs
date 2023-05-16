const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

class User {
    constructor(username,email,mobile,password,cart,id) {
        this.username = username
        this.email = email
        this.mobile = mobile
        this.password = password
        this.cart = cart
        this._id = id
    }

    // CRUD...
    static Rusers() {
        const db = getDB()
        return db.collection('users')
            .find()
            .toArray()
            .then(users => {
                return users
            })
            .catch(err => {
                console.error(err);
            })
    }

    static Ruser(userID) {
        const db = getDB()
        return db.collection('users')
            .findOne({_id: new mongodb.ObjectId(userID)})
            .then(user => {
                return user
            })
            .catch(err => {
                console.error(err);
            })
    }

    Cuser() {
        const db = getDB()
        return db.collection('users')
            .insertOne(this)
    }

    // Add to Cart
    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString())
        let newQty = 1
        const updatedCartProducts = [...this.cart.items]
        if (cartProductIndex >= 0) {
            newQty = this.cart.items[cartProductIndex].qty + 1
            updatedCartProducts[cartProductIndex].qty = newQty
        } else {
            updatedCartProducts.push({ productId: new mongodb.ObjectId(product._id), Qty: newQty })
        }

        const updatedCart = {
            items: updatedCartProducts
        }

        const db = getDB()
        return db.collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            )
    }
}

module.exports = User