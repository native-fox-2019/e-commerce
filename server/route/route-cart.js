const Router = require('express').Router()
const controller = require('../controller/cont-product')
const authenticator = require('../middleware/authentication')
const userAuthorize = require('../middleware/userauthorize')

Router.post('/:id',authenticator,controller.addToCart)
Router.get('/',authenticator,controller.getCart)
Router.delete('/:id',authenticator,userAuthorize,controller.deleteCart)

module.exports = Router