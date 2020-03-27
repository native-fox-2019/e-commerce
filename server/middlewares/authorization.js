const { User } = require('../models')

module.exports = function authorization(req, res, next) {
    const { id } = req.user
    User.findOne({ where: { id } })
        .then(data => {
            if (data.role === 'Admin') {
                next()
            } else {
                throw {
                    status: 401,
                    msg: 'Invalid Token'
                }
            }
        })
        .catch(err => {
            next(err)
        })
}