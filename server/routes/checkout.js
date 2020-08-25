const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationNonAdmin')

router.use(authentication)
router.use(authorization)
router.patch('/:id', productController.update)
router.post('/', productController.create)
router.delete('/:id', productController.destroy)

module.exports = router