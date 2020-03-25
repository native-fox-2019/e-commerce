const Router = require('express').Router()
const routerProduct = require('./route-product')
const routerUser = require('./route-user')
const routerCart = require('./route-cart')

Router.get('/home',(request,response)=>{
    response.json({msg:'hello its working'})
})

Router.use('/product',routerProduct)
Router.use('/user',routerUser)
Router.use('/cart',routerCart)




module.exports = Router