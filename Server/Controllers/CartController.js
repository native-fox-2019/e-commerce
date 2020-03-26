const { Cart, User, Product } = require('../models');
const updateCart = require('../Helpers/updateCart');

class CartController {
    static getAll(req, res, next){
        let UserId = Number(req.userData.id);
        Cart.findAll({where: {UserId}, include: Product})
        .then(carts => {
            res.status(200).json({carts})
        })
        .catch(err => {
            console.log(err, '<< dari get carts');
            next({status: 500, msg: 'Server Error'})
        })
    }
    static addCart(req, res, next){
        let UserId = Number(req.userData.id);
        let amount = Number(req.body.amount);
        let ProductId = Number(req.body.ProductId);
        let total_price = null;
        Product.findByPk(ProductId)
        .then(product => {
            console.log('masuk ke sini')
            if(product){
                total_price = amount * Number(product.price);
                let stock = Number(product.stock) - amount;
                if (stock < 0){
                    next({status: 400, msg: `Not enough stock`})
                }else{
                    let updatedProduct = {
                        name: product.name,
                        image_url: product.image_url,
                        price: product.price,
                        stock,
                    }
                    return Product.update(updatedProduct, {where: {id: product.id}})
                }
            }else{
                next({status: 404, msg: 'Product not found'})
            }
        })
        .then(updated => {
            if(updated) {
                return Cart.findOne({where: {ProductId, UserId}, include: Product})
            }
        })
        .then(found => {
            if(found) {
                updateCart(req, res, next, found)
            } else {
                return Cart.create({
                    amount, total_price, UserId, ProductId
                }, {include: Product})
            }
        })
        .then(createdCart => {
            if(createdCart){
                res.status(201).json({createdCart, message: 'Succesfully add item to cart'})
            }
        })
        .catch(err => {
            console.log(err, '<<< dari create cart');
            next({status: 500, msg: 'Server Error'})
        })
    }
    static deleteCart(req, res, next){
        let id = Number(req.params.id)
        let foundCart = null;
        Cart.findByPk(id)
        .then(cart => {
            if(cart){
                foundCart = cart
               return Product.findByPk(cart.ProductId)
            }else{
                next({status: 404, msg: 'Cart Not Found'})
            }
        })
        .then(product => {
            if(product){
                let stock = Number(product.stock) + Number(foundCart.amount);
                let updatedProduct = {
                    name: product.name,
                    image_url: product.image_url,
                    price: product.price,
                    stock,
                }
                return Product.update(updatedProduct, {where: {id: product.id}})
            }

        })
        .then(updated => {
            if(updated){
                return Cart.destroy({where: {id}})
            }
        })
        .then(deleted => {
            if(deleted){
                res.status(200).json({message: 'Item successfully deleted from cart'});
            }else{
                next({status: 400, msg: 'Unsuccessfully delete cart'})
            }
        })
        .catch(err => {
            console.log(err, '<<< dari delete cart');
            next({status: 500, msg: 'Server Error'})
        })
    }
}

module.exports = CartController