const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Products = new Schema({
    category:{type:Schema.Types.ObjectId , ref : 'Category' },
    name:String,
    image:String,
    price:Number
})

module.exports = mongoose.model('Products',Products)