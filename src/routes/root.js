const route = require('express').Router()

route.get(('/'),(req,res)=>{
    res.render('home')

})

module.exports = route