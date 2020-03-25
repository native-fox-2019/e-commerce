const router = require('express').Router()
const ControllerProducts = require('../controllers/product')
const authen = require('../middleware/authen')

router.get('/', ControllerProducts.getAllProduct)
router.get('/:id', ControllerProducts.getOneProduct)

router.post('/', authen, ControllerProducts.addProduct)
router.put('/:id', authen, ControllerProducts.updateProduct)
router.delete('/:id', authen, ControllerProducts.deleteProduct)


module.exports = router