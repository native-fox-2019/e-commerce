const { Cart } = require('../models')

class cartController {

    static addCart(req, res) {
        let input = {
            name: req.body.name,
            amount: req.body.amount,
            usersId: req.payloadUser.data.id,
            productsId: req.body.id,
            image_url: req.body.image_url,
            price: req.body.price
        }
        let idItem = {
            where: {
                productsId: req.body.id
            }
        }

        Cart.findOne(idItem)
            .then(item => {
                if (item) {
                    let inputUpdate = {
                        name: req.body.name,
                        amount: req.body.amount,
                        usersId: req.payloadUser.data.id,
                        productsId: req.body.id,
                        image_url: req.body.image_url,
                        price: req.body.price
                }
                    return Cart.update(inputUpdate, idItem)
                } else {
                    return Cart.create(input)
                }

            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: "add fail" })
            })

    }

    static getCart(req, res) {
        let idCustomer = {
            where: {
                usersId: req.payloadUser.data.id
            }
        }
        Cart.findAll(idCustomer)
            .then(item => {
                res.status(200).json(item)
            })
            .catch(err => {
                res.status(404).json({ message: "data is not found" })
            })
    }

    static deleteCart(req, res) {
        let idItem = {
            where: {
                id: req.params.id
            }
        }

        Cart.destroy(idItem)
            .then(item => {
                res.status(200).json(item)
            })
            .catch(err => {
                res.status(500).json({ message: "delete is fail" })
            })
    }

}
module.exports = cartController
