const {Cart} = require('../models/index')
const jwt = require('jsonwebtoken')

function authorization (request,response,next){
    Cart.findOne({where:{id:request.params.id}})
    .then(data=>{
      if(data){
        if(data.CustId===request.authenticationData.custId){
          next()
        }else{
          throw ({status:403,msg:'invalid credentials'})
        }
      }else{
        throw ({status:404, msg:'data not found'})
      }

    })
    .catch(err=>{
      next(err)
    })

}

module.exports = authorization