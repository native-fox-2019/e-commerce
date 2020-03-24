const { User, Product, Cart } = require('../models');
const createError = require('../helpers/createError');

class CartController {
  static async getAll (req, res, next) {
    try {
      const id = Number(req.UserData.id);
      const user = await User.findOne({ where: { id }, include: [{ model: Product }] });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  static async addCart (req, res, next) {
    try {
      const { stock, ProductId } = req.body;
      const UserId = Number(req.UserData.id);
      const productData = await Product.findOne({ where: { id: ProductId } });
      if (!productData) {
        throw createError(404, 'Error Not Found');
      }
      if (stock > productData.stock) {
        throw createError(400, 'You cannot buy more than the stock available');
      }
      if (stock < 1) {
        throw createError(400, 'Please enter the stock number');
      }
      const obj = { stock, ProductId, UserId };
      const newCart = await Cart.create(obj);
      res.status(201).json(newCart);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCart (req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const cart = await Cart.findOne({ where: { id } });
      if (!cart) {
        throw createError(404, 'Error Not Found');
      }
      await Cart.destroy({ where: { id } });
      res.status(200).json({
        msg: 'Success'
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateCart (req, res, next) {
    try {
      const id = Number(req.params.id);
      const { stock, operator } = req.body;
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const cart = await Cart.findOne({ where: { id } });
      if (!cart) {
        throw createError(404, 'Error Not Found');
      }
      const product = await Product.findOne({ where: { id: cart.ProductId } });
      if (!product) {
        throw createError(400, 'Your product is out of stock');
      }
      if (((Number(stock) + cart.stock) > product.stock) && operator === '+') {
        throw createError(400, 'You cannot buy more than the stock available');
      } else if ((cart.stock - Number(stock) < 0) && operator === '-') {
        throw createError(400, 'You cannot buy a minus stock');
      }
      let newStock;
      if (operator === '+') {
        newStock = Number(stock) + Number(cart.stock);
      } else if (operator === '-') {
        newStock = Number(cart.stock) - Number(stock);
      } else {
        throw createError(400, 'Operator is between + and -');
      }
      await Cart.update({ stock: newStock }, { where: { id } });
      res.status(200).json({
        msg: 'Success'
      })
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CartController;