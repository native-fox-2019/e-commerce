const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authenticationUser = require('../middlewares/authentication')

router.get('/' ,authenticationUser,CartController.getAllCart)
router.post('/' ,authenticationUser,CartController.AddCart)
router.delete('/:id' ,authenticationUser,CartController.deleteCart)
router.put('/:id' ,authenticationUser,CartController.updateCart)

module.exports = router