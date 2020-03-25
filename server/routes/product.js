const router = require('express').Router();
const Controller = require('../controllers/ProductController');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

router.get('/', Controller.getProducts);
router.get('/:id', Controller.getOneProduct);
router.post('/', authentication, authorization, Controller.addProduct);
router.post('/:id', authentication, Controller.addToCart);
router.put('/:id/stocks', authentication, Controller.updateStock);
router.put('/:id', authentication, authorization, Controller.updateProduct);
router.delete('/:id', authentication, authorization, Controller.deleteProduct);

module.exports = router;