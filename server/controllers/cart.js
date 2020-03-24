'use strict'

const {User, Cart, Product} = require('../models')

class ControllerCart {
    static add(req,res,next){
        Cart.create(payload)
        .then(data => res.status(201).json({message: `${data.name} has been added to your cart`}))
        .catch(next)
    }

    static removeFromCart(req,res,next){
        let temp = null
        Cart.findOne({where:{id:req.params.id}})
        .then(data => {
            temp = data
            return Cart.destroy({where:{id: req.params.id}})
        })
        .then(() => res.status(200).json({ message: `${temp.name} has been removed from your cart`,}))
        .catch(next)
    }

    static checkout(req,res,next) {
        let product = null
        Cart.findAll({where:{UserId:req.user.id}})
        .then(data => {
            data.forEach(el => {
                product = el
                Product.findOne(payload, {where:{id:product.id}})
                .then(data => {
                    const objUpdate = { name, prices, stocks:stocks-product.amount, imageURL }
                    temp = objUpdate
                    console.log('====== ini value temp =====', temp)
                    return Products.update(objUpdate, {where:{id:data.id}})
                })
                .then(() => {
                    Cart.destroy({where:{id:product.id}})
                    .then(() => console.log(`sukses checkout product ${product.name}`))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            res.status(200).json({
                message: `you've successfully check out`
            })
        })
        .catch(next)
    }
}


module.exports = ControllerCart