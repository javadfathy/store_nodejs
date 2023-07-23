// REQURE MODULES
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const multer = require('multer')
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
app.set('views','src/views')

// Custom Function
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'product-thumbnail')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toDateString() + "-" + file.originalname)
    }
})

const fileFilterFormat = (req, file, cb) => {
    if( file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// APP USE
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({ storage: fileStorage, fileFilter: fileFilterFormat }).single('thumbnail'))

app.use(express.static(path.join(__dirname,'public')))
app.use('/product-thumbnail', express.static(path.join(__dirname,'product-thumbnail')))
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)
app.use(flash())
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
        app.listen(3_000)
    })
    .catch(err => {
        console.error(err);
    })