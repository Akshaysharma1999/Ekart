const route = require('express').Router()
const Products = require('../models/product')
const Cart = require('../models/cart')

route.get(('/'), (req, res) => {
    res.render('home')

})

route.get('/products/:id', (req, res, next) => {
    // console.log(req.params.id)
    Products.find({ category: req.params.id })
        .populate('category')
        .exec((err, products) => {

            if (err) return next(err)

            res.render('products', { products: products })
        })
})

route.get('/product/:id', (req, res, next) => {
    // console.log(req.params.id)
    Products.findOne({ _id: req.params.id }, (err, product) => {
        if(err) return next(err)
        res.render('single-product',{product:product})
    })
})

route.post('/product/:id',(req,res,next)=>{
    console.log(req.body)
    // res.send(req.user)
    
    Cart.findOne({user : req.user._id},(err,cart)=>{
        if(err) next(err)

        cart.items.push(
            {
                item: req.body.product_id,
                price :parseFloat(req.body.price),
                quantity:parseInt(req.body.quantity)
            }
        )

        cart.total = cart.total + parseFloat(req.body.price)
        
        cart.save((err)=>{
            if(err) return next(err)
            return res.redirect('/cart')
        })
    })
    

})


route.get('/cart',(req,res,next)=>{
    res.send('cart hbs')
})

module.exports = route