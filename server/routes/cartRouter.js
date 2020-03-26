const router = require('express').Router()
const CartController = require('../controllers/cartzController')
const authenticationUser = require('../middlewares/authentication')

router.get('/' ,authenticationUser,CartController.getCart)
router.post('/' ,authenticationUser,CartController.addCart)
router.delete('/:id' ,authenticationUser,CartController.deleteCart)
router.put('/:id',authenticationUser,CartController.updateCart)

module.exports = router