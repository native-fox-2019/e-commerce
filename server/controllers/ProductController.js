const { Product } = require('../models');

class ProductController {
  static async getAll (req, res, next) {
    try {
      console.log('feafe');
      const products = await Product.findAll();
      console.log(products);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = ProductController;