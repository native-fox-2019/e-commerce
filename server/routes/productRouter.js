const router = require('express').Router()
const ProductController = require('../controllers/productController')


router.post('/',  ProductController.addProduct)
// router.get('/',  TaskController.getProduct)
// router.put('/:id',  TaskController.editProduct)
// router.delete('/:id',  TaskController.deleteProduct)

module.exports = router