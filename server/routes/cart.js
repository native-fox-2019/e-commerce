const router = require('express').Router()
const cartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.post('/',cartController.addCart)
router.get('/',cartController.getCart)
router.delete('/:id',cartController.deleteCart)

module.exports=router