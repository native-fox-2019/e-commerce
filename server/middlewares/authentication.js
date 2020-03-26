const jwt = require('../helpers/jwt')
const { users, products } = require('../models')

module.exports = (req, res, next) => {
    let { token } = req.headers
    console.log(req.headers, "ini headers")
    let payload
    // console.log(tokenCustomer,"ini token customer")

    // if(tokenAdmin){
    payload = jwt.jwtVerify(token)
    // } else {
    // payload = jwt.jwtVerify(tokenCustomer)
    // }


    console.log("ini payload", payload)

    let id = {
        where: {
            id: payload.data.id
        }
    }

    users.findOne(id)
        .then(user => {
            if (user) {
                req.payloadUser = payload
                next()
            } else {
                res.status(404).json({ msg: "data is not found" })
            }
        }).catch(err => {
            res.status(500).json({ msg: "internal server error" })
        })
}