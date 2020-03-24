const { User, Cart } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

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


}

module.exports = Controller