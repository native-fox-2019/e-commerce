const { CustomerProduct } = require('../models/index')
function authCust (req, res, next){
    console.log('authorization customer')
    CustomerProduct.findOne({
        where: {
            ProductId: req.params.id,
            CustomerId : req.userdata.id
        }
    })
    .then(data=>{
        //if(data.CustomerId === req.userdata.id)
        next()
        // else {
        //     res.status(400).json('not authorized')
        //}
    })
    .catch(e => res.status(404).json("data not found"))
}

module.exports = authCust