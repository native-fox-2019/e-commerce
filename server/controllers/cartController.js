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
               return model.Cart.findByPk(data.id, {
                   include: [`Product`]
               })
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
        var { qty, ProductId } = req.body

        model.Product.findByPk(ProductId)
            .then(data => {
                if (qty > data.stock) {
                    throw createError(400, `Quantity can't be higher that stock`)
                } else {
                    return model.Cart.update({
                        qty
                    }, {
                        where: {
                            id: req.params.id
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
        var { qty, ProductId, UserId, cost } = req.body

        model.Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    return model.Product.findByPk(ProductId)
                } else {
                    throw createError(404, `ID ${req.params.id} Cart item that does not exist`)
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
                    returning: true
                })
            })
            .then(data => {
                return model.User.findByPk(Number(UserId))
            })
            .then(data => {
                data.wallet -= cost
                return model.User.update({
                    wallet: data.wallet
                }, {
                    where: {
                        id: data.id
                    }
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static read(req, res, next) {
        model.Cart.findAll({
            where: {
                UserId: req.user.id
            },
            include: [`Product`]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = CartController