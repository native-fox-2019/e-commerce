'use strict'

require('dotenv').config()
const {Sequelize,User, Product, Cart } = require('../models')
const { sign } = require('../helpers/jwt')
const { checkPass } = require('../helpers/bcrypt')
const Op = Sequelize.Op

class ControllerUser {
    static getAll(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static addToCart(req, res, next) {
        Cart.findOne({
            where: {
                [Op.and]: [
                    {UserId: req.user.id},
                    {ProductId: req.params.id}
                ]
            }
        })
        .then(data =>{
            if(data){
                let payload = {
                    UserId: data.UserId,
                    ProductId: data.ProductId,
                    amount: data.amount+Number(req.body.amount)
                }
                return Cart.update(payload, {where:{id:data.id}} )
            } else {
                let payload = {
                    UserId: req.user.id,
                    ProductId: Number(req.params.id),
                    amount: req.body.amount
                }
                console.log(payload)
                return Cart.create(payload)
            }
        })
            .then(data => res.status(201).json({ message: `item(s) has been added to your cart` }))
            .catch(err => {
                console.log(err)
                next(err)})
        }
    static cart(req, res, next) {
        User.findAll({where:{id:req.user.id}, include: [Cart]})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    // static editProfile (req,res,next){}
    static removeFromCart(req, res, next) {
        let temp = null
        Cart.findOne({ where: { id: req.params.id } })
            .then(data => {
                if (data) {
                    return Cart.destroy({ where: { id: req.params.id } })
                } else {
                    next({
                        status: 404,
                        message: "you haven't put this item(s) on your cart yet"
                    })
                }
            })
            .then(() => res.status(200).json({ message: `succesfully removing from your cart`, }))
            .catch(next)
    }
    static checkout(req, res, next) {
        let product = null
        Cart.findAll({ where: { UserId: req.user.id } })
            .then(data => {
                data.forEach(el => {
                    product = el
                    Product.findOne({ where: { id: product.id } })
                        .then(data => {
                            console.log(123)
                            const objUpdate = { 
                                name: data.name, 
                                prices: data.price, 
                                stocks: data.stocks - product.amount, 
                                imageURL: data.imageURL
                            }
                            return Product.update(objUpdate, { where: { id: data.id } })
                        })
                        .then(() => {
                            Cart.destroy({ where: { id: product.id } })
                                .then(() => console.log(`sukses checkout product ${product.name}`))
                            // .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                })
                return Cart.destroy({where:{UserId:req.user.id}})
                })
                .then(()=>
                res.status(200).json({
                    message: `you've successfully check out`
                }))
                .catch(err => {
                    next(err)
                })
    }
}

module.exports = ControllerUser