// REQURE MODULES
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// REQURE PROJECT
const shopRoute = require('./routes/shop')
const blogRoute = require('./routes/blog')
const adminRoutes = require('./routes/admin')
const indexRoutes = require('./routes/index')
const User = require('./models/user')

const app = express()

// APP SET
app.set('view engine', 'ejs')
app.set('views','views')

// APP USE
app.use(bodyParser.urlencoded({extended: false}))
app.use(indexRoutes)

app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next) => {
    User.findById('64654217fbda88a08a2abcad')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.error(err);
        })
})

// should set req before use route else not worked... fucking.....

app.use('/admin',adminRoutes)
app.use(shopRoute)
app.use(blogRoute)




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