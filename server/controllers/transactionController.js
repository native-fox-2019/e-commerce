const { Transaction, Product, User } = require('../models')

class TransactionController {
  static allCart(req, res, next) {
    Transaction
      .findAll({
        where: {
          UserId: req.user.id
        }, include: [
          Product
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static get(req, res, next) {
    Transaction
      .findAll({
        where: {
          UserId: req.user.id
        }
      }, { include: [Product] })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getOne(req, res, next) {
    Transaction
      .findOne({
        where: {
          id: req.params.id
        }, include: [Product]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static add(req, res, next) {
    const { ProductId, quantity } = req.body
    Product
      .findOne({
        where: {
          id: ProductId
        }
      })
      .then(data => {
        if (data.stock <= quantity) {
          throw {
            status: 400,
            msg: 'Stock has not enough.'
          }
        } else if (data.stock > quantity) {
          Transaction
            .findAll({
              where: {
                ProductId,
                UserId: req.user.id
              }
            })
            .then(data => {
              console.log(data, "masuk kah?");
              // res.send(data)
              if (data.length >= 1) {
                throw {
                  status: 400,
                  msg: 'You added the product already. Please Check your cart to set the Quantity.'
                }
              } else {
                console.log('test1');

                Transaction
                  .create({
                    ProductId,
                    quantity: 1,
                    UserId: req.user.id
                  })
                  .then(data => {
                    res.status(201).json(data)
                  })
                  .catch(err => {
                    next(err)
                  })
              }
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static destroy(req, res, next) {
    Transaction
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: "Data not found."
          }
        } else {
          res.status(200).json("Successfully Delete a data.")
        }
      })
      .catch(err => {
        next(err)
      })
  }

  // static destroyById(req, res, next) {
  //   Transaction
  //     .destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     })
  //     .then(data => {
  //       if (!data) {
  //         throw {
  //           status: 404,
  //           msg: "Data not found."
  //         }
  //       } else {
  //         res.status(200).json("Successfully Delete a data.")
  //       }
  //     })
  //     .catch(err => {
  //       next(err)
  //     })
  // }

  static updateQuantity(req, res, next) {
    let { quantity, ProductId } = req.body
    Transaction
      .findOne({
        where: {
          id: req.params.id,
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: "Data not found!"
          }
        } else {
          Product
            .findOne({
              where: {
                id: data.ProductId
              }
            })
            .then(data => {
              console.log("masuk sini kah?", data, '?????????????????????????????????????????????????????????????????????????????????');
              if (!data) {
                throw {
                  status: 404,
                  msg: "Data not found."
                }
              }
              else if (data.stock < quantity) {
                throw {
                  status: 400,
                  msg: "Don't have enough stock."
                }
              }
              else if (quantity <= 0) {
                throw {
                  status: 400,
                  msg: "Cannot set quantity 0 or less than 0"
                }
              }
              else if (data.stock >= quantity) {
                Transaction
                  .update({
                    quantity
                  },
                    {
                      where: {
                        id: req.params.id
                      },
                      returning: true,
                    })
                  .then(data => {
                    console.log(data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

                    res.status(200).json(data)
                  })
                  .catch(err => {
                    next(err)
                  })
              }
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TransactionController