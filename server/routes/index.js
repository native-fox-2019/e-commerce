'use strict'
const express = require('express');
const router = express.Router();
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Cart = require('./cart');
const History = require("./history");

router.use('/user', User)
router.use('/products', Product)
router.use('/categories', Category)
router.use('/carts', Cart)
router.use("/histories", History);

module.exports = router