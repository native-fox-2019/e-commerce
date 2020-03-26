const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middleware/authentication')

router
    .use(authentication)
    .patch('/:id', productController.update)
    .post('/', productController.create)
    .delete('/:id', productController.delete)

module.exports = router
