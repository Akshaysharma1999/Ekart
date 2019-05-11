const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const Cart = require('./models/cart')
const session = require('express-session')
const passport = require('./auth/passport')
const categories = require('./models/category')

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
    
    res.locals.tq = 0 
    
    // if (req.user) {
    //     let total = 0
        
    //     Cart.findOne({ user: req.user._id }, (err, user_cart) => {
    //         if (err) next(err)

    //         // console.log('akshaycart')

    //         if (user_cart) {
    //             for (i = 0; i < user_cart.items.length; i++) {
    //                 total += user_cart.items[i].quantity
    //             }
    //             res.locals.tq = total
    //         }
    //         else {
    //             res.locals.tq = 0
    //         }
         
    //          console.log(res.locals.tq)
    //     })
    // }
    next()
    
   
})


app.use('/', require('./routes/root'))
app.use('/', require('./routes/user'))
app.use('/', require('./routes/admin'))
app.use('/faker', require('./faker/api'))




mongoose.connect('mongodb+srv://ekart:ekart@cluster0-0t2s9.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err) => {
    if (err) { return err }
    console.log('connected to db')

    app.listen('3000', () => { console.log("http://localhost:3000/") })

})
