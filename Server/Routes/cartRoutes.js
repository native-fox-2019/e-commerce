const router = require('express').Router();
const CartController = require('../Controllers/CartController');
const authentication = require('../Middlewares/authentication');
const authorization = require('../Middlewares/cartAuthorization')

router.get('/', authentication, CartController.getAll);
router.post('/', authentication, CartController.addCart);
router.delete('/:id', authentication, authorization, CartController.deleteCart)

module.exports = router