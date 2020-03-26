const { Product,Transaction,Address } = require('../models/index.js')

class productController{

    static view(req,res,next){
        Product.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
               next({status: 500, msg: 'Internal server error!'}) 
        })
    }

    static getProduct(req,res,next){
        Product.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
               next({status: 500, msg: 'Internal server error!'}) 
        })
    }

    static add(req,res,next){
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
            } else{
                next({status: 500, msg: 'Internal server error!'})
            }
        })
    }

    static getOne(req,res,next){
        let id = req.params.id
        Product.findOne({where:{id:id}})
        .then(result=>{
            if(result){
               res.status(200).json(result) 
            } else{
                next({status: 404, msg: 'Data not found!'})
              }
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static edit(req,res,next){
        let id = req.params.id
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.update(obj,{where:{id:id}})
        .then(result=>{
            res.status(200).json(obj)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
            } else{
                next({status: 500, msg: 'Internal server error!'})
            }
            
        })
    }

    static delete(req,res,next){
        let id = req.params.id
        Product.destroy({where:{id:id}})
        .then(result=>{
            res.status(200).json({status: result, msg: 'file has been deleted'})
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
        
    }

    static addToCart(req,res,next){
        let obj={
            UserId : req.userData.id,
            ProductId : req.body.ProductId
        }
        Transaction.create(obj)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static editStock(req,res,next){
        let id = req.params.id
        let obj = {
            stock : req.body.stock
        }
        Product.update(obj,{where:{id:id}})
        .then(result=>{
            res.status(200).json(obj)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
            } else{
                next({status: 500, msg: 'Internal server error!'})
            }
            
        })
    }

    static getCart(req,res,next){
        Product.findAll()
        .then(product=>{
            Transaction.findAll({include:Product,where:{UserId:req.userData.id}})
            .then(data=>{
                res.status(200).json(data)
            })
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'}) 
        })
    }

    static deleteCart(req,res,next){
        let id = req.params.id
        Transaction.destroy({where:{id:id}})
        .then(result=>{
            res.status(200).json({status: result, msg: 'file has been deleted'})
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static addAddress(req,res,next){
        let obj = {
            name : req.body.name,
            country : req.body.country,
            address : req.body.address,
            zipcode : req.body.zipcode,
            phone : req.body.phone,
            UserId : req.userData.id
        }
        Address.create(obj)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static getAddress(req,res,next){
        Address.findOne({where:{UserId:req.userData.id}})
        Address.create(obj)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

}

module.exports = productController