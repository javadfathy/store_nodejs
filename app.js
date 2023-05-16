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

// app.use((req,res,next) => {
//     User.Ruser('646348a092fb2220da359725')
//         .then(user => {
//             req.user = new User(user.username, user.email,user.mobile,user.password,user.cart,user._id)
//             next()
//         })
//         .catch(err => {
//             console.error(err);
//         })
// })

// should set req before use route else not worked... fucking.....

app.use('/admin',adminRoutes)
app.use(shopRoute)
app.use(blogRoute)




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