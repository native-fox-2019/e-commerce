'use strict'
const { Cart, User, Product, Category, History } = require('../models')

class Controller {
  static findAll(req, res, next) {
    Cart
      .findAll({
        include: [Product],
        where: {
          UserId: req.user
        },
      })
      .then(data => {
          res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static findOne(req, res, next) {
        const {id} = req.params
        Cart
        .findOne({
            include: [Product],
            where: {
                id: id, UserId: req.user
            },
        })
        .then(data =>{
            if (data) {
                res.status(200).json(data)
            }else{
              throw { status: 404, message: "Data Not Found" }
            }
        })
        .catch(err =>{
            next(err)
        })
  }
  static create(req, res, next) {
    console.log(req.body)
    const UserId = req.user
    const { ProductId } = req.body         
    Cart
    .create({ 
        UserId: UserId,
        ProductId: ProductId,
        quantity: 1,
    })
    .then(data =>{
      console.log(data)
        res.status(201).json(data)
    })
    .catch(err =>{
        next(err)
    })
  }
  static update(req, res, next) {
    const { id } = req.params
    const { quantity } = req.body
    Cart
    .findOne({
      where: {
        id,
        UserId: req.user
      }
    })
      .then(data => {
        if (!data) {
          throw { status: 404, message: "Data Not Found" }
        } else {
          return Product.findOne({where:{id: data.ProductId}})
        }
    })
      .then(data => {
        if (data.stock < quantity) {
          throw { status: 400, message: `Stock only ${data.stock}`}
        } else {
          return Cart.update({ quantity: quantity }, {
            where: { id: id },
            returning: true
          })
        }
    })
    .then(data =>{
      if (data[0] === 0) {
        throw {status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json(data[1][0])
      }
    })
    .catch(err =>{
        next(err)
    })
  }
  static destroy(req, res, next){
    const {id} = req.params
    Cart
    .destroy({ where: { id, UserId: req.user} })
    .then(data =>{
      if (!data) {
        throw{status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json("Product hasbeen removed from Cart")
      }
    })
    .catch(err =>{
        next(err)
    })
  }
  static checkout(req, res, next) {
    let dataCheckout = req.body
    console.log(dataCheckout)
    console.log(dataCheckout.cart[0].Product);
    let productCheckout = [];
    let objHistory = {
      products: []
    };
    let no = 1
    dataCheckout.cart.forEach(el => {
      let tmp = {}
      tmp.id = no++
      tmp.quantity = el.quantity;
      tmp.name = el.Product.name
      tmp.image_url = el.Product.image_url
      tmp.price = el.Product.price;
      objHistory.products.push(tmp)
    });
    console.log(objHistory);
    // res.status(200).json(objHistory);
    let dataCart = []
    dataCheckout.cart.forEach(el => {
      let stockResult = el.Product.stock - el.quantity;
      if (stockResult < 0) {
        throw { status: 400, message: el.Product.name + " Out of Stock" };
      } else {
        dataCart.push({
          UserId: el.UserId,
          ProductId: el.ProductId,
          stockNow: stockResult
        });
      }
    });
    let objUpdate = []
    dataCart.forEach(item => {
      objUpdate.push(
        Product
          .update(
            { stock: item.stockNow },
            {
              where: { id: item.ProductId }
            }
          )
      )
    })
    Promise.all(objUpdate)
      .then(result => {
        console.log('create')
        return History
          .create({
            UserId: req.user,
            totalPrice: dataCheckout.totalPrice,
            products: objHistory.products
          })
      })
      .then(data => {
        console.log('delete')
        Cart
          .destroy({
              where: {
                  UserId: req.user
              }
          })
          .then(result => {
              res.status(200).json(result)
          })
      })
      .catch(err => {
          next(err)
      })
  }
}

module.exports = Controller