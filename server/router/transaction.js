"use strict"
const transactionController = require('../controllers/transactionController')
const authentication = require("../middleware/authentication");
const Router = require("express").Router()
console.log('masukkkkkk')
    Router.use(authentication)
    Router.post("/", transactionController.create)
    Router.get("/", transactionController.findAll)
    Router.patch("/:id", transactionController.update)
    console.log('masukkkk router')
    Router.delete("/:id", transactionController.delete);
  
module.exports = Router;
