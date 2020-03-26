let {Cart} = require('../models')

function cartAutorization(req, res, next){
    let id = Number(req.params.id);
    let UserId = Number(req.userData.id)
    Cart.findByPk(id)
    .then(cart => {
        if(cart){
            if(cart.UserId === UserId){
                next()
            }else{
                next({status: 403, msg: 'Not Authorized'})
            }
        }else{
            throw ({status: 404, msg: 'cart not found'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = cartAutorization