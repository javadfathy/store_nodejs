const fs = require('fs')
const path = require('path')
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
}