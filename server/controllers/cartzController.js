const { Kart } = require('../models')

class cartzController {

    static addCart(req, res) {
        let input = {
            name: req.body.name,
            amount: req.body.amount,
            usersId: req.UserData.id,
            productsId: req.body.id,
            image_url: req.body.image_url,
            price: req.body.price
        }
        let idItem = {
            where: {
                productsId: req.body.id
            }
        }
        console.log(input)

        Kart.findOne(idItem)
            .then(item => {
                if (item) {
                    let inputUpdate = {
                        name: req.body.name,
                        amount: req.body.amount,
                        usersId: req.UserData.id,
                        productsId: req.body.id,
                        image_url: req.body.image_url,
                        price: req.body.price
                    }
                    console.log(`alskdjlaskdjlaksjlasdkj`)
                    return Kart.update(inputUpdate, idItem)
                } else {
                    return Kart.create(input)
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
                usersId: req.UserData.id
            }
        }
        Kart.findAll(idCustomer)
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

        Kart.destroy(idItem)
            .then(item => {
                res.status(200).json(item)
            })
            .catch(err => {
                res.status(500).json({ message: "delete is fail" })
            })
    }

}
module.exports = cartzController
