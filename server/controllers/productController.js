
const { Product } = require('../models')
require('dotenv').config()

class ProductController {

    static addProduct = (req, res) => {

        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err) {
                    let obj = {
                        error: []
                    }
                    for (let i = 0; i < err.errors.length; i++) {
                        obj.error.push(err.errors[i].message)
                    }
                    res.status(400).json(obj)
                } else {
                    res.status(500).json(err)
                }
            })
    }
}

module.exports = ProductController