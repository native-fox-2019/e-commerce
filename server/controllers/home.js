'use strict'

const {User, Cart, Product} = require('../models')
const {sign} = require('../helpers/jwt')
const {compare} = require('../helpers/bcrypt')
class ControllerHome {
    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data => {
            if(data){
                if(compare(data.password, password)) {
                    let access_token = sign(payloads)
                    res.status(200).json({access_token})
                } else {
                    next({
                        status:400,
                        message: 'invalid username/password'
                    })
                }
            } else {
                next({
                    status:404,
                    message: "email not registered"
                })
            }
        })
    .catch(next)
    }

    static register(req,res,next){
        const {email, password} = req.body
        User.create({email, password})
        .then(data => {
            payloads = {
                id: data.id,
                email: data.email
            }
            let access_token = sign(payloads)
            res.status(201).json({access_token})
        })
        .catch(next)
    }
}

module.exports = ControllerHome