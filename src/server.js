const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User= require('./models/user')
const session = require('express-session')
const passport = require('./auth/passport')


app.use(express.json() )
app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')

app.use(session({
    secret:"somesecret",
    saveUninitialized:true,
    resave:true
    
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    res.locals.user = req.user
    next()
})

app.use('/',require('./routes/root'))
app.use('/',require('./routes/user'))

mongoose.connect('mongodb+srv://ekart:ekart@cluster0-0t2s9.mongodb.net/test?retryWrites=true',{useNewUrlParser: true},(err)=>{
    if(err){   return err    }
    console.log('connected to db')
    
app.listen('3000',()=>{console.log("http://localhost:3000/")})
  
})
