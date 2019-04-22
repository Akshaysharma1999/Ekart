const mongoose = require('mongoose')
const Schema = mongoose.Schema

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


module.exports = mongoose.model('User',User)