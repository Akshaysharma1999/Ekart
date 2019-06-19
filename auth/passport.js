const passport = require('passport')
const LocalStrategy  = require('passport-local').Strategy
const Users =  require('../models/user')

passport.serializeUser((user,done)=>{done(null,user._id)})

passport.deserializeUser((id,done)=>{
    Users.findById(id , (err,user)=>{

        if(!user)
        {
            return done(new Error("no such user"))
        }
        return done(null,user)
    
    })
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    
  },(email,password,done)=>{

    Users.findOne({email : email},(err,user)=>{

        if(!user){return done(null,false,{message:"no such user -p"})}

        
        if(!user.comparePassword(password))
        {
            return done(null,false,{message:"wrong password -p "})
        }

        return done(null,user)
    })
}))           

module.exports = passport