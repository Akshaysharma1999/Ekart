const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')

const User = require('./models/user')
const Cart = require('./models/cart')
const passport = require('./auth/passport')
const categories = require('./models/category')
const config = require('./config/dbConfig')


const port= process.env.PORT || 3000 

app.use('/',express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')


app.use(session({
    secret: "somesecret",
    saveUninitialized: true,
    resave: true

}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', (req, res, next) => {
    res.locals.user = req.user;
    next()
})
app.use('/', (req, res, next) => {
    categories.find({}, (err, categories) => {
        if (err) return next(err)
        res.locals.categories = categories;
        next()
    })
})

app.use('/', (req, res, next) => {

    if (req.user) {
        let total = 0        
        Cart.findOne({ user: req.user._id }, (err, user_cart) => {
           if (err) return next(err)
            // console.log('akshaycart')
            if (user_cart) {
                for (var i = 0; i < user_cart.items.length; i++) {
                    total += user_cart.items[i].quantity
                }
                res.locals.tq = total
            }
            else {
                res.locals.tq = 0
            }
         next()
            //  console.log(res.locals.tq)
        })
    }
    else{
        next() 
    }        
})


app.use('/', require('./routes/root'))
app.use('/', require('./routes/user'))
app.use('/', require('./routes/admin'))
app.use('/faker', require('./faker/api'))

mongoose.connect(config.mongosecret, { useNewUrlParser: true }, (err) => {
    if (err) { return err }
    console.log('connected to db')
    app.listen( port , () => { console.log("http://localhost:"+port) })
})
