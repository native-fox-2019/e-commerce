const { User, Product, Cart } = require('../models');

class CartController {

    static getAllCart = (req,res) => {
        let id = Number(req.UserData.id)
        User.findOne({ where : {id}, include: [{model: Product}]
        })
        .then((user) => {
            res.status(200).json(user)
        })
        .cath(err => {
            res.status(500).json(err)
        })
    }

    static addCart = (req,res) => {
        let { stock, ProductId } = req.body
        let UserId = Number(req.UserData.id)    
        Product.findOne({ where : { id: ProductId }
        })
        .then((result) =>{

            if(!result){
                res.status(404).json({msg:`Error Not Found`})
            }
            if(stock > productData.stock) {
                res.status(400).json({msg:`You cannot buy more than the stock available`})
            }
            if(stock < 1){
                res.status(400).json({msg: `Please insert stock number`})
            }
            let obj = { stock, ProductId, UserId }

            Cart.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
        })
        .catch(err => {
            
            res.status(500).json(err)
        })
    }

    static deleteCart = (req, res) => {
        let id = Number(req.params.id)
        Cart.findOne({ where: {id} 
        })
        .then(result => {
            if(!result) {
                res.status(404).json({msg:`Error Not Found`})
            }
             Cart.destroy({ where: { id } 
            })
            .then(data => {
                res.status(200).json({msg:`Success`})
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateCart = (req,res) => {
        let id = Number(req.params.id)
        let {stock, operator } = req.body;
        Cart.findOne({ where: { id }
        })
        .then(cart => {
            if(!cart){
                res.status(404).json({msg:`Error Not Found`})
            }
             Product.findOne({ where: { id: cart.ProductId }
            })
            .then(prod => {
                if(!prod){
                    res.status(404).json({msg:`Out of Stock`})
                }
                if(((Number(stock) + cart.stock) > product.stock) && operator === '+') {
                    res.status(400).json({msg:`You cannot buy more than available stock`})
                }
                let newStock
                if( operator === '+') {
                    newStock = Number(stock) + Number(cart.stock);
                }else if (operator === '-') {
                    newStock = Number(cart.stock) - Number(stock);
                }else{
                    res.status(400).json({msg:`Operator is between + and -`})
                }
                 Cart.update({ stock: newStock }, {where: { id } 
                })
                .then(result => {
                    res.status(200).json({msg:`Success`})
                })
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static checkout(req, res) {
        var { stock, ProductId } = req.body

        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    return Product.findByPk(ProductId)
                } else {
                    res.status(400).json({msg:`Cant remove item that does not exist`})}
            })
            .then(data => {
                data.stock = Number(data.stock) - Number(qty)

                return Product.update({
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
            .catch(err => {
                res.status(500).json(err)
            })
    }

};

module.exports = CartController;