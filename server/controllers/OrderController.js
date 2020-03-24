const {
    Order,
    Product
} = require('../models');
// const Op = require('sequelize').Sequelize.Op
const orderCoder = require('../helpers/orderCoder')
const groupByAndCount = require('../helpers/groupByAndCount')

class OrderController {
    static readAll(request, response, next) {
        Order.findAll({
                where: {
                    user_id: request.userData.id
                }
            })
            .then(result => {
                let result_ = groupByAndCount(result)
                console.log(result_)
                let data_response = []
                for (let i = 0; i < result_[0]; i++) {
                    data_response.push({
                        order_code: result_[0][i],
                        total_product: result_[1][i],
                        order_date: result[i].createdAt
                    })
                }
                response.status(200).json(data_response)
            })
            .catch(err => {
                next(err)
            })
    }

    static readByCode(request, response, next) {
        Order.findAll({
                where: {
                    code: request.params.code
                },
                include: {
                    model: Product
                }
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

    static createOrder(request, response, next) {
        let order_code = orderCoder(10)
        for (let i = 0; i < request.body; i++) {
            request.body[i].code = order_code
            request.body[i].user_id = request.userData.id
        }
        Order.bulkCreate(request.body)
            .then(result => {
                response.status(201).json({
                    message: 'order successfully created'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOrder(request, response, next) {
        Order.findAll({
                where: {
                    code: request.params.code
                }
            })
            .then(result => {
                if (result.length != 0) {
                    return Order.destroy({
                        where: {
                            code: request.params.code
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