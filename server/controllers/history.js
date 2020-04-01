'use strict'
const { History } = require('../models')

class Controller {
  static findAll(req, res, next) {
    History
      .findAll({
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
}

module.exports = Controller