const orderRouter = require('express').Router()
const OrderController = require('../controllers/OrderController')
const Authentication = require('../middlewares/Authentication')
const ORDR_IDAuthorization = require('../middlewares/ORDR_IDAuthorization')
const ORDR_CODEAuthorization = require('../middlewares/ORDR_CODEAuthorization')

orderRouter.get('/', Authentication, OrderController.readAll)
orderRouter.get('/:code', Authentication, ORDR_CODEAuthorization, OrderController.readByCode)
orderRouter.get('/seller/incomingOrder', Authentication, OrderController.readBySellerId)

orderRouter.post('/', Authentication, OrderController.createOrder)

orderRouter.patch('/seller/confirmOrder/:id', Authentication, OrderController.sellerConfirm)
orderRouter.patch('/finishOrder/:id', Authentication, OrderController.buyerConfirm)

orderRouter.delete('/:id', Authentication, ORDR_IDAuthorization, OrderController.deleteOrder)

module.exports = orderRouter