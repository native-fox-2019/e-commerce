const router = require('express').Router()
const productController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.get('/customer',productController.getAllProductsCustomer)
router.use(authentication)
router.get('/',productController.getAllProducts)
router.post('/',productController.addProduct)
router.put('/:id',productController.updateProduct)
router.get('/:id',productController.getProduct)
router.delete('/:id',productController.deleteProduct)


module.exports=router