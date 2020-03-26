const { Product, User, Cart } = require('../models');

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
      console.log(name);
      const obj ={
        name,
        image_url,
        price,
        stock,
        category,
      };
      const edited = await Product.update(obj, { where: { id } });
      if (edited) {
        res.status(200).json({ edited: obj, message: 'Successfully edit a product'});
      }
    } catch (err) {
      next(err);
    }
  };

  static async updateStock(req, res, next) {
    try {
      const { id } = req.userData;
      const user = await User.findOne({ where: { id }, include: [ Product ] });
      let query = [];
      user.Products.forEach((el) => {
        const newStock = el.stock - el.Cart.quantity;
        query.push(Product.update({ stock: newStock }, { where: { id: el.id } }));
        query.push(Cart.destroy({ where: { ProductId: el.id, UserId: id } }));
      });

      await Promise.all(query);
      res.status(200).json({ message: 'Success Buy' });
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
      if (deleted) {
        res.status(200).json({ message: 'Successfully delete a product' });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProductController;