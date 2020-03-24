'use strict'

const {User, Cart, Product} = require('../models')

class ControllerCart {
    static add(req,res,next){
        const payload = {
            UserId: req.user.id,
            ProductsId: req.params.id,
            amount: req.body.amount
        }
        let temp = null
        Cart.create(payload)
        .then(data => {
            return Product.findOne({where:{id:req.params.id}})
        })
        .then(({data}) => {
            const objUpdate = {
                name,
                prices,
                stocks:stocks-req.body.amount,
                imageURL
            }
            temp = objUpdate
            return Products.update(objUpdate, {where:{id:data.id}})
        })
        .then(data => {
            res.status(201).json({
                message: `${temp.name} has been added to your cart`,
            })
        })
        .catch(next)
    }
    static delete(req,res,next){
        let temp = null
        Cart.findOne({where:{id:req.params.id}})
        .then(data => {
            temp = data
            return Cart.delete({where:{id: req.params.id}})
        })
        .then(() => {
            return Product.findOne({where:{id:temp.ProductsId}})
        })
        .then(data => {
            const objUpdate = {
                name,
                prices,
                stocks:stocks+temp.amount,
                imageURL
            }
            return Products.update(objUpdate, {where:{id:temp.ProductsId}})
        })
        .then(()=> res.status(200).json({
            message: `${temp.name} has been removed from your cart`,
        }))
        .catch(next)
    }
}

module.exports = ControllerCart