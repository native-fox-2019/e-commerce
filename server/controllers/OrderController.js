const {
    Order,
    Product
} = require('../models');
// const Op = require('sequelize').Sequelize.Op
const orderCoder = require('../helpers/orderCoder')
const groupByAndCount = require('../helpers/groupByAndCount')

class OrderController {

    static readAll(request, response, next) { //SUDAH
        Order.findAll({
                where: {
                    user_id: request.userData.id
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(result => {
                let result_ = groupByAndCount(result)
                let data_response = []
                for (let i = 0; i < result_[0].length; i++) {
                    data_response.push({
                        order_code: result_[0][i],
                        total_product: result_[1][i],
                        order_date: result_[2][i]
                    })
                }
                response.status(200).json(data_response)
            })
            .catch(err => {
                next(err)
            })
    }

    static readByCode(request, response, next) { //SUDAH
        Order.findAll({
                where: {
                    code: request.params.code
                },
                include: {
                    model: Product
                },
            })
            .then(result => {
                if (result.length != 0) {
                    response.status(200).json(result)
                } else {
                    throw {
                        status_code: 404,
                        message: 'order not found'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static readBySellerId(request, response, next) { //SUDAH
        Order.findAll({
                where: {
                    seller_id: request.userData.id
                },
                include: {
                    model: Product
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(result => {
                response.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static sellerConfirm(request, response, next) { //SUDAH
        let data_order
        let data_product
        Order.update({
                status: 'On Process'
            }, {
                where: {
                    id: request.params.id
                }
            })
            .then(result => {
                return Order.findByPk(request.params.id)
            })
            .then(result => {
                data_order = result
                return Product.findByPk(data_order.product_id)
            })
            .then(result => {
                data_product = result
                return Product.update({
                    stock: Number(Number(data_product.stock) - Number(data_order.qty))
                }, {
                    where: {
                        id: data_product.id
                    }
                })
            })
            .then(result => {
                response.status(200).json({
                    message: 'confirmed by seller'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static buyerConfirm(request, response, next) { //SUDAH
        Order.update({
                status: 'Finished'
            }, {
                where: {
                    id: request.params.id
                }
            })
            .then(result => {
                response.status(200).json({
                    message: 'Order Finished'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static createOrder(request, response, next) { //SUDAH
        let order_code = orderCoder(10)
        for (let i = 0; i < request.body.length; i++) {
            request.body[i].code = order_code
            request.body[i].user_id = request.userData.id
            request.body[i].status = 'Waiting confirmation'
        }
        Order.bulkCreate(request.body)
            .then(result => {
                response.status(201).json({
                    order_code: order_code,
                    message: 'order successfully created'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOrder(request, response, next) { //SUDAH
        Order.findAll({
                where: {
                    id: request.params.id
                }
            })
            .then(result => {
                if (result.length != 0) {
                    return Order.destroy({
                        where: {
                            id: request.params.id
                        }
                    })
                } else {
                    throw {
                        status_code: 404,
                        message: 'order not found'
                    }
                }
            })
            .then(result => {
                if (result) {
                    response.status(200).json({
                        message: 'Order successfully deleted'
                    })
                } else {
                    throw {
                        status_code: 400,
                        message: 'something wrong'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = OrderController;