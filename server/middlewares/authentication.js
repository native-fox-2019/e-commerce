const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticationUser(req, res, next) {
    try {
        const { token } = req.headers
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = User.findOne({ where: { id:decoded.id}})
        if(!user){
            throw new Error({msg: `You have to login first`})
        }
        req.UserData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationUser