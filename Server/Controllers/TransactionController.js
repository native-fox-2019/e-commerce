const { Transaction, User, Cart, Product } = require('../models');

class TransactionController{
    static addTransaction(req, res, next){
        let amount = Number(req.body.amount);
        let ProductId = Number(req.body.ProductId);
        let total_price = Number(req.body.total_price);
        let address = req.body.address;
        let UserId = req.userData.id;
        Transaction.create({
            amount, total_price, address, UserId, ProductId
        })
        .then(result => {
            if (result) {
                if(req.body.id){
                    let id = Number(req.body.id);
                    return Cart.destroy({where: {id}})
                }else{
                    res.status(201).json({message: 'Successfully make a transaction'})
                }
            }else{
                throw({Status: 500, msg: 'failed add transaction'})
            }
        })
        .then(deleted => {
            if(deleted){
                res.status(201).json({message: 'Successfully make a transaction'})
            }else{
                throw({Status: 500, msg: 'Failed delete item from cart'})
            }
        })
        .catch(err => {
            console.log(err, '<< dari add transaction');
            next({status: 500, msg: 'Server Error'})
        })
    }
    static addBulkTransactions(req, res, next) {
        let UserId = req.userData.id;
        let address = req.body.address
        let transactions = [];
        Cart.findAll({where: {UserId}})
        .then(carts => {
            if(carts){
                carts.forEach(item => {
                    transactions.push({
                        amount: item.amount,
                        total_price: item.total_price,
                        address,
                        UserId,
                        ProductId: item.ProductId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                })
                return Transaction.bulkCreate(transactions);
            }
        })
        .then(result => {
            if (result){
                return Cart.destroy({where: {UserId}})
            }
        })
        .then(result2 => {
            if(result2) {
                res.status(201).json({message: 'Successfully make transactions'});
            }
        })
        .catch(err => {
            console.log(err, '<< dari add transactions');
            next({status: 500, msg: 'Server Error'})
        })
    }

}

module.exports = TransactionController