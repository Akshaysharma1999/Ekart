const route = require('express').Router()
const User = require('../models/user')
const Products = require('../models/product')
const Cart = require('../models/cart')
const stripe = require('stripe')('sk_test_MKfrL0egKWHteBeC3tyv6eiG00k1N52GEY')


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
        if (err) return next(err)
        res.render('single-product', { product: product })
    })
})

route.post('/product/:id', (req, res, next) => {
    console.log(req.body)
    // res.send(req.user)

    Cart.findOne({ user: req.user._id }, (err, cart) => {
        if (err) next(err)

        console.log('here')
        console.log(cart)

        cart.items.push(
            {
                item: req.body.product_id,
                price: parseFloat(req.body.price),
                quantity: parseInt(req.body.quantity)
            }
        )

        cart.total = cart.total + parseFloat(req.body.price)

        cart.save((err) => {
            if (err) return next(err)
            return res.redirect('/cart')
        })
    })


})


route.get('/cart', (req, res, next) => {

    console.log(req.user)
    Cart.findOne({ user: req.user._id })
        .populate('items.item')
        .exec((err, user_cart) => {
            if (err) next(err)

            // console.log(user_cart)
            res.render('cart', { user_cart: user_cart })
        })


})

route.post('/remove', (req, res, next) => {
    // res.send('here')
    // console.log(req.body)
    Cart.update(
        { user: req.user._id },
        { $pull: { items: { item: req.body.item } } },
        { safe: true },
        function removeConnectionsCB(err, obj) {
            // console.log(obj)
            Cart.findOne({ user: req.user._id }, (err, cart) => {
                cart.total = (cart.total - parseFloat(req.body.price))
                cart.save((err) => {
                    if (err) return next(err)

                    res.redirect('/cart')
                })


            })
        })
})

route.post('/payment', (req, res, next) => {
    // console.log("whdgfhsf")
    // console.log(req.body)
    const stripetoken = req.body.stripeToken
    const stripemoney = Math.round(100 * req.body.stripeMoney)

    stripe.customers.create({
        description: 'Customer for jenny.rosen@example.com',
        source: stripetoken // obtained with Stripe.js
    }, function (err, customer) {
        if (err) next(err)

        return stripe.charges.create({
            amount: stripemoney,
            currency: "usd",
            source: "tok_visa", // obtained with Stripe.js
            description: "Charge for jenny.rosen@example.com"
        }, function (err, charge) {

            Cart.findOne({ user: req.user._id }, (err, cart) => {
                if (err) return next(err)

                console.log(cart)
                User.findOne({ _id: req.user._id }, (err, user) => {
                    if (err) return next(err)

                    if (user) {
                        for (let i = 0; i < cart.items.length; i++) {
                            user.history.push({
                                item: cart.items[i].item,
                                paid: cart.items[i].price
                            })
                        }
                    }

                    user.save((err) => {
                        if (err) return next(err)

                        Cart.update({ user: user._id }, { $set: { items: [], total: 0 } }, (err, updated) => {
                            if (updated)
                                res.redirect('/')
                        })
                    })
                })
            })
            // res.redirect('/')
        });
    })
})

route.get('/pay', (req, res, next) => {

    Cart.findOne({ user: req.user._id })
        .populate('items.item')
        .exec((err, user_cart) => {
            if (err) next(err)

            // console.log(user_cart)
            res.render('stripe_pay', { user_cart: user_cart })
        })

})

route.get('/history', (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .populate('history.item')
        .exec((err, user) => {
            if (err) next(err)
            console.log(user.history)
            res.render('history', { user: user })
        })

})

module.exports = route