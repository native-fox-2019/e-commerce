const { Product } = require('../models');

class ProductController {
  static async getAll (req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = ProductController;