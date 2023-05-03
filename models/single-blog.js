const blogs = []

module.exports = class Blog {
    constructor(title) {
        this.title = title
    }

    savePost() {
        blogs.push(this)
    }

    static getPosts() {
        return blogs
    }
}