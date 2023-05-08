const products = []

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
        products.push(this)
    }

    static getProducts() {
        return products
    }

    static getProduct(title) {
        const product = products.find(x => x.title === title)
        return product
    }
}