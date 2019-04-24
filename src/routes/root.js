const route = require('express').Router()
const Categories = require('../models/category')

route.get(('/'), (req, res) => {
    res.render('home')

})

module.exports = route