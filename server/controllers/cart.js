const { Cart, Product, User } = require('../models')


class ControllerCart {
  static getAll(req, res, next) {
    Cart
      .findAll({
        order: [['createdAt', 'DESC']],
        attributes: { include: ['id'] },
        include: [{ model: Product }, { model: User }]
      })
      .then(result => {
        console.log(result, '<<<<<<<<<< findall cart then')
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(result, '<<<<<<<<<< findall cart catch')
        console.log(err)
      })
  }

  static addCart(req, res, next) {
    const { ProductId } = req.body
    const UserId = req.user.id

    Cart
      .findOne({ where: { ProductId, UserId } })
      .then(result => {
        console.log(result, '<<<<<<<<<< findone add cart then')
        let isi = result
        if (!isi) {
          return Cart.create({ ProductId, UserId, qty: 1 })
        } else {
          let temp = isi.qty
          temp++
          return result.update({ qty: temp })
        }
      })
      .then(resultadd => {
        res.status(201).json(resultadd)
      })
      .catch(err => {
        console.log(err)
        console.log(err, '<<<<<<<<<< findone add cart catch')
      })
  }

  static editCart(req, res, next) {
    let id = req.params.id
    Cart
      .findOne({ where: { id: id } })
      .then(resFindOne => {
        return resFindOne.update({ qty: resFindOne.qty + req.body.value })
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteCart(req, res, next) {
    let id = req.params.id
    let isi = null
    Cart
      .findOne({ where: { id: id } })
      .then(result => {
        isi = result
        return Cart.destroy({ where: { id: id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy > 0) {
          res.status(200).json(isi)
        } else {
          let err = {
            statusCode: '404',
            message: 'not found'
          }
          next(err)
        }
      })
      .catch(err => {
        res.status(500)
      })
  }


  static checkout(req, res, next) {
    Cart
      .findAll({
        include: [{ model: Product }, { model: User }]
      })
      .then(result => {
        let arrCheckout = []
        result.forEach(res => {
          if (res.qty > res.Product.stock) {
            arrCheckout.push('stock habis')
          }
        })
        if (arrCheckout.length != 0) {
          throw (arrCheckout)
        } else {
          result.forEach(el => {
            el.Product.update({ stock: el.Product.stock - el.qty })
            el.destroy()
          })
          return result
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }




}

module.exports = ControllerCart