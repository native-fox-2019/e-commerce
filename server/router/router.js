const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController.js')
const productController = require('../controller/productController.js')
const userController = require('../controller/userController.js')
const authentication = require('../middleware/authentication')
const authorization= require('../middleware/authorization')

router.get('/userproduct',productController.getProduct)
router.post('/addtocart',authentication,productController.addToCart)
router.put('/editstock/:id',authentication,productController.editStock)
router.get('/getcart',authentication,productController.getCart)

router.post('/user/register',userController.userRegister)
router.post('/user/login',userController.userLogin)

router.post('/admin/register',adminController.register)
router.post('/admin/login',adminController.login)

router.get('/product',authentication,authorization,productController.view)
router.post('/product',authentication,authorization,productController.add)
router.get('/product/:id',authentication,authorization,productController.getOne)
router.put('/product/:id',authentication,authorization,productController.edit)
router.delete('/product/:id',authentication,authorization,productController.delete)



module.exports = router