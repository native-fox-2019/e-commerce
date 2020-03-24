const orderRouter = require('express').Router()
const OrderController = require('../controllers/OrderController')
const Authentication = require('../middlewares/Authentication')
const ORDR_CODEAuthorization = require('../middlewares/ORDR_CODEAuthorization')

orderRouter.get('/', Authentication, OrderController.readAll)
orderRouter.get('/:code', Authentication, ORDR_CODEAuthorization, OrderController.readByCode)

orderRouter.post('/', Authentication, OrderController.createOrder)

orderRouter.delete('/:code', Authentication, ORDR_CODEAuthorization, OrderController.deleteOrder)

module.exports = orderRouter