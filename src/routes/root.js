const route = require('express').Router()
const Products = require('../models/product')

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

module.exports = route