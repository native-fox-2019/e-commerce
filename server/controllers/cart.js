'use strict'

const {User, Cart, Product} = require('../models')

class ControllerCart {
    static add(req,res,next){
        const payload = {
            UserId: req.user.id,
            ProductsId: req.params.id,
            amount: req.body.amount
        }
        let productName = null
        Cart.create(payload)
        .then(data => {
            return Product.findOne({where:{id:req.params.id}})
        })
        .then(({data}) => {
            productName = name
            const objUpdate = {
                name,
                prices,
                stocks:stocks-req.body.amount,
                imageURL
            }
            return Products.update(objUpdate, {where:{id:data.id}})
        })
        .then(data => {
            res.status(201).json({
                message: `${productName} has been added to your cart`,
            })
        })
        .catch(next)
    }
    static delete(req,res,next){
        Cart.delete({where:{id: req.params.id}})
        .then(() => {
            return Product.findOne({where:{id:req.params.id}})
        })
        .then(data => {
            const objUpdate = {
                name,
                prices,
                stocks:stocks-req.body.amount,
                imageURL
            }
            return Products.update(objUpdate, {where:{id:data.id}})
        })
        .catch(next)
    }
}

module.exports = ControllerCart