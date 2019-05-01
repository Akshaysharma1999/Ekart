const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    items: [{
       item : {
           type:Schema.Types.ObjectId,ref:'Product'
        },
        quantity:{type:Number,default:'1'},
        price :{type:Number,default:'0'}
      } ],
    total :{type:Number,default:'0'}
})

module.exports = mongoose.model('Cart', Cart)