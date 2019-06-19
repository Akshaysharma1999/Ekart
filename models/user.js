const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const User = new Schema({

    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String, // hash pwd later
    address: String,
    picture: { type: String, default: '' },
    name: { type: String, default: '' },
    history: [{
        date: Date,
        paid: { type: Number, default: 0 },
        item: { type: Schema.Types.ObjectId, ref: 'Products' }
    }]
})

User.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)
       
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)          
            user.password = hash;
            next()
        })
    })
})

User.methods.comparePassword = function (password) {
   return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User)