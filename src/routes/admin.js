const route = require('express').Router()
const Categories = require('../models/category')

route.get(('/add-categories'), (req, res,next) => { 
   
    Categories.find({},(err,categories)=>{
        if(err) return next(err)

        console.log(categories)
        res.render('add-categories',{categories:categories})
    })
   
})

route.post(('/add-categories'), (req, res, next) => {

    const categories = new Categories
    categories.name = req.body.name

    Categories.findOne({name:req.body.name},(err,existing_category)=>{
        if(existing_category) { return res.redirect('/add-categories') }

        categories.save()
        res.redirect('/add-categories')
    })  
})



module.exports = route