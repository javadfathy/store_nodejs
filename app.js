// REQURE MODULES
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
// REQURE PROJECT
const shopRoute = require('./routes/shop')
const blogRoute = require('./routes/blog')
const adminRoutes = require('./routes/admin')
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const User = require('./models/user')

const app = express()

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/jwadshop',
    collection: 'session'
})

// APP SET
app.set('view engine', 'ejs')
app.set('views','views')

// APP USE
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname,'public')))
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

app.use((req,res,next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.error(err);
        })
})

// should set req before use route else not worked... fucking.....

app.use(indexRoutes)
app.use('/admin',adminRoutes)
app.use(shopRoute)
app.use(blogRoute)
app.use(authRoutes)




app.use((req, res) => {
    res.status(404).send("Page Not Found!")
})


mongoose.connect('mongodb://127.0.0.1:27017/jwadshop',{useNewUrlParser: true})
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        username: "jwad",
                        email: "jwad@gmail.com",
                        mobile: "111111111111111111",
                        password: "1234",
                        cart: {
                            items: []
                        }
                    })
                    user.save()
                }
            })
        app.listen(3_000)
    })
    .catch(err => {
        console.error(err);
    })