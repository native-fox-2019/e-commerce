const router  = require('express').Router()
const Controller = require('../controllers')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/cart', Controller.getCart)
router.post('/cart', Controller.addToCart)

module.exports = router