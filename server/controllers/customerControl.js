const { Customer } = require('../models/index')
const { CustomerProduct } = require('../models/index')
const { Product } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class CustomerControl {
    static register(req, res, next){
        Customer.findOne({
            where: {email:req.body.email}
        })
        .then(data=>{
            if(data){
                res.status(400).json("your e-mail has been registered")
            } else {
                Customer.create(req.body)
                .then(data=>res.status(201).json(data))
                .catch(err=>next(err))
            }
        })   
        .catch(err=>next(err))
    }

    static login(req, res, next){
        let { email, password } = req.body
        Customer.findOne({
            where: { email }
        })
        .then(customer=>{
            if(customer){
                if (bcrypt.compareSync(password, customer.password)){
                    let token = jwt.sign({id: customer.id, email: customer.email}, 'aaa')
                    res.status(200).json({token})
                } else {
                    res.status(400).json('password wrong')
                }
            } else{
                res.status(400).json('email wrong')
            }
        })
        .catch(err => next(err))
    }

    static showCart(req, res, next){
        let custId = req.userdata.id
        console.log(custId+"<<<custId")
        Customer.findOne({
            where: {id: custId}, 
            include: [{model: Product}]
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addCart(req, res, next){
        CustomerProduct.findOne({
            where: {
                CustomerId: req.userdata.id,
                ProductId: req.params.id
            }
        })
        .then(result=>{
            if(result){
                res.status(400).json('product is already in your cart')
            } else {
                let newData={
                    CustomerId: req.userdata.id,
                    ProductId: req.params.id,
                    quantity: 1,
                    status_order: false
                }
                console.log(newData)
                return CustomerProduct.create(newData)
            }
        })
        
        // .then(data1=>{
        //     console.log(data1)
        //     return Product.findOne({
        //         where: {
        //             id: req.params.id
        //         }
        //     })
        // })
        // .then(data2=>{
        //     console.log(data2)
        //     let newStock = data2.stock - Number(req.body.quantity)
        //     return Product.update({
        //         stock: newStock
        //     }, {
        //         where: {
        //             id: req.params.id
        //         }
        //     })
        // })
        .then(data3=>{
            console.log("sukses")
            res.status(200).json("product has been added in chart")
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static delCart(req, res, next){
        console.log('delcart')
        console.log(req.params.id)
        CustomerProduct.destroy({
            where: {ProductId: req.params.id}
        })
        .then(data=>{
            console.log(data)
            res.status(200).json('deleted success')
        })
        .catch(err=>{
            next(err)
        })
    }

    static orderCart(req, res, next){
        console.log(req.params.id)
        console.log(req.body)
        CustomerProduct.update(req.body, {
        // CustomerProduct.findOne({
            where: {
                ProductId: req.params.id,
                CustomerId: req.userdata.id
            }
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            next()
        })
    }

}
    
module.exports = CustomerControl