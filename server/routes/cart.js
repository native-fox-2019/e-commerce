const controllerCart = require('../controllers/cart')
const route = require('express').Router()
const authen = require('../middleware/authen')


route.get('/', authen, controllerCart.getAll)
route.post('/', authen, controllerCart.addCart)
route.patch('/checkout', authen, controllerCart.checkout)
route.patch('/:id', authen, controllerCart.editCart)
route.delete('/:id', authen, controllerCart.deleteCart)

module.exports = route