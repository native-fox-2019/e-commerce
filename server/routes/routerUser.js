'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerUser')
const authUser = require('../middlewares/authorUser')

router.get('/cart', Controller.cart)
router.put('/cart/:id', Controller.updateCart)
router.delete('/cart/:id', Controller.removeFromCart)
router.post('/addToCart/:id', Controller.addToCart)
router.delete('/checkout', Controller.checkout)


module.exports = router