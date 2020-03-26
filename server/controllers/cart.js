const { Cart, products } = require('../models')

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
                    if (req.body.price < 1 || req.body.stock < 1) {
                        res.status(500).json({ message: "input harus lebih dari 0" })
                    } else {
                        return Cart.update(inputUpdate, idItem)
                    }
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
            },
            order: [['createdAt', 'ASC']]
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

    static updateCart(req, res) {
        let idItem = {
            where: {
                id: req.params.id
            }
        }
        let input = {
            amount: req.body.amount
        }
        products.findOne({
            where: {
                id: req.body.productsId
            }
        }).then(product => {
            if (product.stock < req.body.amount) {
                res.status(500).json({ message: "tidak boleh lebih dari stok" })
            } else {
                Cart.update(input, idItem)
                    .then(item => {
                        return Cart.findOne(idItem)
                    })
                    .then(item => {
                        res.status(200).json(item)
                    })
                    .catch(err => {
                        res.status(500).json({ message: "edit is fail" })
                    })
            }
        }
        )
    }
}

module.exports = cartController
