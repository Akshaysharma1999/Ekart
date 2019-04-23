const route = require('express').Router()
const User = require('../models/user')
const passport = require('../auth/passport')

route.get('/login',(req,res)=>{
    if(req.user) res.redirect('/profile')

    res.render('login')
})
route.get('/signup',(req,res)=>{
    
    if(req.user) res.redirect('/profile')

    res.render('signup')
})

route.get('/profile',(req,res,next)=>{
    console.log(req.user)
    if(!req.user) res.redirect('/login')

    User.findOne({_id:req.body._id},(err,user)=>{
        if(err) return next(err)

        res.render('profile',{user:req.user})
    })
})

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
            return res.redirect('/signup')
        }
        else{
            
            user.save((err,user)=>{
                if(err)
                {
                    return next(err)               
                }
                console.log("added succesfully")
                req.logIn(user,(err)=>{
                    if(err) return next(err)

                    res.redirect('/profile')
               

                })
                
            })

        }
    })

    
})


route.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

route.get('/edit-profile',(req,res,next)=>{
    res.render('edit-profile')
})

route.post('/edit-profile',(req,res,next)=>{

    User.findOne({_id:req.user._id},(err,user)=>{

        if(err) return next(err)

        if(req.body.name) user.name = req.body.name

        if(req.body.address) user.address = req.body.address

        user.save((err)=>{
            if(err) return next(err)
            
            return res.redirect('/profile') 
        })
        
    })
    
})

module.exports = route