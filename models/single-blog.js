const fs = require('fs')
const path = require('path')
const filePath = path.join(path.dirname(process.mainModule.filename),'data','posts.json')

module.exports = class Blog {
    constructor(title) {
        this.title = title
    }

    savePost() {
        fs.readFile(filePath, (err, fileContent) => {
            let products = []
            if (!err) 
                products = JSON.parse(fileContent)
            products.push(this)
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static getPosts(cb) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err)
                cb([])
            cb(JSON.parse(fileContent))
        })
    }
}