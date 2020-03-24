const { User, Cart } = require('../models')

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

  }
}

module.exports = Controller