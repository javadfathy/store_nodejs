const fs = require('fs')
const path = require('path')
const Cart = require("./cart")
const filePath = path.join(path.dirname(process.mainModule.filename),'data','products.json')

const getProductFromFile = (cb) => {
    fs.readFile(filePath, (err, fileContent) => {
        if (err)
            cb([])
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(title, description, price, attribute, brand, thumbnail, category, comments) {
        this.title = title
        this.description = description
        this.price = price
        this.attribute = attribute
        this.brand = brand
        this.thumbnail = thumbnail
        this.category = category
        this.comments = comments
    }

    saveProduct() {
        getProductFromFile((products) => {
            products.push(this)
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id) {
        getProductFromFile((products) => {
            const product = products.find(p => p.id === +id)
            const updatedProducts = products.filter(p => p.id !== +id)

            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteCart(id, product.price)
                }
            })
        })
    }

    static getProducts(cb) {
        getProductFromFile(cb)
    }

    static getProduct(title, cb) {
        getProductFromFile((products) => {
            const product = products.find(x => x.title === title)
            cb(product)
        })
        // const product = products.find(x => x.title === title)
        // return product
    }

    static getProductWithId(id, cb) {
        getProductFromFile((products) => {
            const product = products.find(x => x.id === +id)
            console.log(product)
            cb(product)
        })
    }
}