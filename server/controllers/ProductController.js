const { Product } = require('../models');

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };

  static async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        next(
          {
            status: 404,
            message: 'Data not found',
          },
        );
        return false;
      }

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  static async addProduct(req, res, next) {
    try {
      const { name, image_url, price, stock, category } = req.body;
      const obj = {
        name,
        image_url,
        price,
        stock,
        category,
      };
      const newProduct = await Product.create(obj);
      res.status(201).json({ newProduct, message: "Sucessfully add a product" });
    } catch (err) {
      next(err);
    }
  };

  static async updateProduct(req, res, next) {
    try {
      const { name, image_url, price, stock, category } = req.body;
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        next(
          {
            status: 404,
            message: 'Data not found',
          },
        );
        return false;
      }

      const obj ={
        name,
        image_url,
        price,
        stock,
        category,
      };
      const edited = await Product.update(obj, { where: { id } });
      res.status(200).json({ edited: obj, message: 'Successfully edit a product'});
    } catch (err) {
      next(err);
    }
  };

  static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        next(
          {
            status: 400,
            message: 'Data not found',
          },
        );
        return false;
      }

      const obj = {
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stock: product.stock - stock,
      };
      const edited = await Product.update(obj, { where: { id } });
      res.status(200).json({ edited: obj, message: 'Successfully buy a product' });
    } catch (err) {
      next(err);
    }
  };

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        next(
          {
            status: 404,
            message: 'Data not found',
          },
        );
        return false;
      }

      const deleted = await Product.destroy({ where: { id } });
      res.status(200).json({ message: 'Successfully delete a product' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProductController;