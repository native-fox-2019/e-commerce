"use strict"
const user = require("./userRouter")
const Router = require("express").Router()
const product = require("./productRouter");

Router
    .use('/products',product)
    .use('/user', user)

module.exports = Router