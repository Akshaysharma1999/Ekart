const route = require('express').Router()
const User = require('../models/user')
const passport = require('../auth/passport')

route.get('/login',(req,res)=>{res.render('login')})
route.get('/signup',(req,res)=>{res.render('signup')})

route.post('/login', passport.authenticate('local' , { failureRedirect: '/login',successRedirect:'/profile' }))

route.post('/signup',(req,res,next)=>{
   
    const user = new User();
    user.email = req.body.email
    user.name = req.body.name
    user.address = req.body.address
    user.password = req.body.password

    User.findOne({email:req.body.email},(err,existinguser)=>{

        if(existinguser)
        {
            console.log(req.body.email+" is already registered")
            res.redirect('/signup')
        }
        else{
            
            user.save((err)=>{
                if(err)
                {
                    return next(err)               
                }
                console.log("added succesfully")
                res.redirect('/login')
               
            })

        }
    })

    
})

route.get('/profile',(req,res)=>{
    // console.log(req.body)
    res.send("hi " )
})

module.exports = route