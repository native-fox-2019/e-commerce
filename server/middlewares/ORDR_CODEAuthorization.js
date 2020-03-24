const {
    Order
} = require('../models')

module.exports = (request, response, next) => {
    Order.findAll({
            where: {
                code: request.params.code
            }
        })
        .then(result => {
            if (result) {
                let temp = result.length
                result.forEach(element => {
                    if (element.user_id == request.userData.id) {
                        temp--
                    }
                })
                if (temp == 0) {
                    next()
                } else {
                    throw {
                        status_code: 400,
                        message: 'Unauthorized'
                    }
                }
            } else {
                throw {
                    status_code: 404,
                    message: 'Data Not Found'
                }
            }
        })
        .catch(err => {
            next(err)
        })
}