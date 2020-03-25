const router = require('express').Router()
const authen = require('../middleware/authen')
const products = require('./product')
const users = require('./users')
const category = require('./category')
const cart = require('./cart')
// router.use('/products', products)
router.use('/users', users)
// router.use(authen)
router.use('/products', products)
router.use('/category', category)
router.use('/cart', cart)

module.exports = router
