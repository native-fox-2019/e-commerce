const router = require('express').Router();
const CartController = require('../Controllers/CartController');
const authentication = require('../Middlewares/authentication');

router.get('/', authentication, CartController.getAll);
router.post('/', authentication, CartController.addCart);

module.exports = router