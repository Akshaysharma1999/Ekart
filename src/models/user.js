const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const User = new Schema({
    
    email:{
        type:String,
        unique:true,    
        lowercase:true  
    },
    password:String, // hash pwd later
    address:String,
    picture:{type:String,default:''},
    name:{type:String,default:''}
})

// User.pre('save',(next)=>{

//     const user = this
    
//     bcrypt.hash(user.password, 10 , function(err, hash) {
//         if(err) return next(err)

//         user.password = hash
//         next()

//     })

// })

// User.methods.comparepwd = (password)=>{

//    bcrypt.compareSync(password,this.password,(err,result,next)=>{
//        if(err) return next(err)

//        return result
//    })
// }


module.exports = mongoose.model('User',User)