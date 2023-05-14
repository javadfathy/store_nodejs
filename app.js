// REQURE MODULES
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// REQURE PROJECT
const shopRoute = require('./routes/shop')
const blogRoute = require('./routes/blog')
const adminRoutes = require('./routes/admin')
const indexRoutes = require('./routes/index')
const connectDB = require('./util/database').connectDB

const app = express()

// APP SET
app.set('view engine', 'ejs')
app.set('views','views')

// APP USE
app.use(bodyParser.urlencoded({extended: false}))
app.use(indexRoutes)
app.use(shopRoute)
app.use(blogRoute)

app.use('/admin',adminRoutes)


app.use(express.static(path.join(__dirname,'public')))

app.use((req, res) => {
    res.status(404).send("Page Not Found!")
})


connectDB(() => {
    app.listen(3_000)
})