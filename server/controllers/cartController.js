const model = require(`../models`);
const createError = require(`../helpers/createErrors`);

class CartController {
    static add(req, res, next) {
        var { ProductId, qty } = req.body

        model.Cart.create({
            UserId: req.user.id,
            ProductId,
            qty
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        model.Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `can't remove Cart item that does not exist`)
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        var { qty } = req.body

        model.Product.findByPk(Number(req.params.id))
            .then(data => {
                if (qty > data.stock) {
                    throw createError(403, `Quantity can't be higher that stock`)
                } else {
                    return model.Cart.update({
                        qty
                    }, {
                        where: {
                            UserId: req.user.id,
                            ProductId: req.params.id
                        }
                    })
                }
            })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `can't edit Cart item that does not exist`)
                }
            })
            .catch(next)
    }

    static checkout(req, res, next) {
        var { qty, ProductId } = req.body

        model.Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    return model.Product.findByPk(ProductId)
                } else {
                    throw createError(404, `can't remove Cart item that does not exist`)
                }
            })
            .then(data => {
                data.stock = Number(data.stock) - Number(qty)

                return model.Product.update({
                    stock: data.stock
                }, {
                    where: {
                        id: data.id
                    },
                    return: true
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = CartController