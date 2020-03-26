const express = require("express")
const router = express.Router()

const authCust = require('../middleware/authCust')
const authorCust = require('../middleware/authorCust')

const customerControl = require('../controllers/customerControl')

router.post('/register', customerControl.register)
router.post('/login',customerControl.login)
router.get('/showcart', authCust, customerControl.showCart)
router.post('/addcart/:id', authCust, customerControl.addCart)
router.delete('/delete/:id', authCust, authorCust, customerControl.delCart)
router.post('/order/:id', authCust, authorCust, customerControl.orderCart)

module.exports = router