const { products } = require('../models')

class productsController {

    static addProduct(req, res) {
        console.log("masuk", req.payloadUser)
        console.log("masuk ga?")
        let input = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            userId: req.payloadUser.data.id
        }
        if (req.body.price < 1 || req.body.stock < 1) {
            res.status(500).json({ message: "input harus lebih dari 0" })
        } else {
            products.create(input)
                .then(data => {
                    res.status(201).json(data)
                }).catch(err => {
                    res.status(500).json({ message: "add fail" })
                })
        }
    }

    static getAllProducts(req, res) {
        let userId = {
            where: {
                userId: req.payloadUser.data.id
            },
            order: [['name', 'ASC']]
        }
        products.findAll(userId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({
                    msg: "data is not found",
                    error: err
                })
            })
    }

    static getAllProductsCustomer(req, res) {
        products.findAll(
            { order: [['name', 'ASC']] }
        )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({
                    msg: "data is not found",
                    error: err
                })
            })
    }

    static getProduct(req, res) {
        let idProduct = {
            where: {
                id: req.params.id
            }
        }
        products.findOne(idProduct)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(404).json({
                    msg: "data is not found"
                })
            })
    }

    static updateProduct(req, res) {
        let idProduct = {
            where: {
                id: req.params.id
            }
        }
        let input = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        if (req.body.price < 1 || req.body.stock < 1) {
            res.status(500).json({ message: "input harus lebih dari 0" })
        } else {
            products.update(input, idProduct)
                .then(data => {
                    res.status(200).json(data)
                }).catch(err => {
                    res.status(400).json({
                        msg: "update fail"
                    })
                })
        }
    }

    static deleteProduct(req, res) {
        let idProduct = {
            where: {
                id: req.params.id
            }
        }

        products.destroy(idProduct)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({
                    msg: "data is not found"
                })
            })
    }
}

module.exports = productsController