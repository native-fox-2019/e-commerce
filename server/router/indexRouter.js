"use strict"
const Router = require("express").Router()
const user = require("./userRouter")
const product = require("./productRouter");
const transaction = require("./transaction");
const checkout = require("./checkout")

Router
    .use('/products',product)
    .use('/user', user)
    .use('/transaction', transaction)
    .use('/checkout', checkout)

module.exports = Router