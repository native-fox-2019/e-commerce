'use strict'

const router = require('express').Router()
const routerHome = require('./routerHome')
const routerProducts = require('./routerProducts')
const routerCart = require('./routerCart')

router.use('/', routerHome)
router.use('/cart', routerCart)
router.use('/poroducts', routerProducts)