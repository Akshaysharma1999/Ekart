const route = require('express').Router()
const Categories = require('../models/category')
const Products = require('../models/product')
const faker = require('faker')

route.get('/:name', (req, res, next) => {

    Categories.findOne({ name: req.params.name }, (err, category) => {
        if (err) return next(err)
    }).then((category) => {

        for (i = 0; i <= 30; i++) 
        {
            const product = new Products
            product.category = category._id
            product.name = faker.commerce.productName()
            product.image = faker.image.image()
            product.price = faker.commerce.price()

            product.save()
        }

    })

    res.send("succes adding products")
})

module.exports = route
