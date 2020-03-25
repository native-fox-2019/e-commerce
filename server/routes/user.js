const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/',userController.getAllUser)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)

module.exports=router