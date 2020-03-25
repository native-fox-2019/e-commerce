const router = require('express').Router()
const productRouter = require('./product')
const userRouter = require('./user')
const cartRouter = require('./cart')


router.use('/product',productRouter)
router.use('/user',userRouter)
router.use('/cart',cartRouter)

module.exports= router

