const route = require('express').Router()
const User = require('../models/user')


route.get('/signup',(req,res)=>{
    res.render('signup')
})

route.post('/signup',(req,res,next)=>{
   
    const user = new User();
    user.email = req.body.email
    user.name = req.body.name
    user.address = req.body.address
    user.password = req.body.password

    User.findOne({email:req.body.email},(err,user)=>{
        if(user)
        {
            console.log(req.body.email+" is already registered")
            res.redirect('/signup')
        }
        else{
            
            user.save((err)=>{
                if(err)
                {
                    return next(err)               //added next(err) here
                }
                res.send("successfully added new user")
            })

        }
    })

    
})

module.exports = route