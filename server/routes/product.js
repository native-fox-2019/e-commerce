const router = require('express').Router();
const Controller = require('../controllers/ProductController');
const authorization = require('../middlewares/authorization');

router.get('/', Controller.getProducts);
router.get('/:id', Controller.getOneProduct);
router.post('/', authorization, Controller.addProduct);
router.put('/:id/stocks', Controller.updateStock);
router.put('/:id', authorization, Controller.updateProduct);
router.delete('/:id', authorization, Controller.deleteProduct);

module.exports = router;