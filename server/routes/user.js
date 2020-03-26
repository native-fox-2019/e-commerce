const router = require('express').Router();
const Controller = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.get('/carts', authentication, Controller.getCart);
router.post('/carts/product/:id', authentication, Controller.addToCart);
router.put('/carts/product/:id', authentication, Controller.updateCart);
router.delete('/carts/product/:id', authentication, Controller.deleteProductFromCart);

module.exports = router;