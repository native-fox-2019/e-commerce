const { Cart } = require('../models');

function updateCart(req, res, next, data){
    let UserId = Number(req.userData.id);
    let amount = Number(req.body.amount) + data.amount;
    let ProductId = Number(req.body.ProductId);
    let total_price = amount * data.Product.price;
    let updateItem = {
        amount, total_price, UserId, ProductId
    }
    Cart.update(updateItem, {where: {id: data.id}})
    .then(result => {
        if (result) {
            updateItem.id = data.id;
            res.status(200).json({updateItem, message: 'Successfully update item in cart'})
        } else {
            next({status: 500, message: 'Something wrong'})
        }
    })
    .catch(err => {
        console.log(err, '<< dari add cart tapiudh ada')
        next({status: 500, msg: 'Server Error'})
    })
}

module.exports = updateCart;