const { User, Cart } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class Controller {
  static register(req, res, next) {
    const { first_name, last_name, email, password } = req.body
    const input = {
      first_name,
      last_name,
      email,
      password
    }

    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if(data){
          next({ status: 400, message: 'User has been registered!'})
        }else{
          return User.create(input)
        }
      })
      .then(newUser => {
        res.status(200).json(newUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    let id, first_name, last_name
    User.findOne({
      where: { email }
    })
     .then(user => {
       if(user){
        id = user.id
        first_name = user.first_name
        last_name = user.last_name     
        return compare(password, user.password)
       }else{
         next({status: 400, message:'Email not registered'})
       }
     })
     .then(result => {
       if(result){
        let token = jwt.sign({
          id,
          first_name,
          last_name,
          email
        }, process.env.SECRET)
        res.status(200).json({usertoken: token})
       }else{
         next({status: 401, message:'Wrong password!'})
       }
     })
     .catch(err => {
       next(err)
     })
  }
  static getCart(req, res, next) {
    let userData = jwt.verify(req.headers.usertoken, process.env.SECRET)
    let UserId = userData.id
    let ProductId = []
    let cart = []

    Cart.findAll({
      where: { UserId }
    })
      .then(data => {
        if(data.length > 0){
          data.forEach(element => {
            ProductId.push(element.ProductId);
          });
          return axios.get('https://guarded-thicket-66622.herokuapp.com/product')
        }else{
          next({ status: 404, message: 'Carts is empty!'})
        }
      })
      .then(products => {
        console.log(products)
        ProductId.forEach(element => {
        console.log('masuk 1')
          products.data.forEach(product => {
            console.log('masuk 2')
            if(product.id === element){
              cart.push(product)
              console.log('masuk 3')
            }
          })
        })
        res.status(200).json({ cart })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static addToCart(req, res, next) {
    let ProductId = req.body.ProductId
    let userData = jwt.verify(req.headers.usertoken, process.env.SECRET)
    let UserId = userData.id
    console.log(ProductId)
    Cart.create({
      UserId,
      ProductId
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = Controller