// REQURE MODULES
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// REQURE PROJECT
const shopRoute = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const app = express()

// APP SET
app.set('view engine', 'ejs')
app.set('views','views')

// APP USE
app.use(bodyParser.urlencoded({extended: false}))
app.use(shopRoute)
app.use('/admin',adminRoutes)

app.use(express.static(path.join(__dirname,'public')))

app.use((req, res) => {
    res.status(404).send("Page Not Found!")
})


app.listen(3_000)