const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User= require('./models/user')

app.use(express.json() )
app.use(express.urlencoded({extended:true}))

app.get(('/'),(req,res)=>{res.send("ekart site")})

app.post('/create-user',(req,res,next)=>{
    const user = new User();

    user.email = req.body.email
    user.name = req.body.name
    user.address = req.body.address
    user.password = req.body.password

    user.save((err)=>{
        if(err)
        {
            return next(err)               //added next(err) here
        }
        res.send("successfully added")
    })
    
})




mongoose.connect('mongodb+srv://ekart:ekart@cluster0-0t2s9.mongodb.net/test?retryWrites=true',{useNewUrlParser: true},(err)=>{
    if(err)
    {
        return err
    }

    console.log('connected to db')
    app.listen('3000',()=>{console.log("http://localhost:3000/")})
})

