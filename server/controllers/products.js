'use strict'
const {User, Cart, Product} = require('../models')

class ControllerProduct {
    static getAll (req,res,next){
        Products.findAll()
        .then(data => res.status(200).json(data))
        .catch(next)
    }
    static getOne (req,res,next){
        Products.findOne({where:{id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(next)
    }
}

module.exports = ControllerProduct