const { Costumer, Product, Cart } = require("../models");
const createError = require("http-errors");

class Controller {
  static async cart(req, res, next) {
    try {
      let productCondition = {
        where: {
          ProductId: req.body.id,
          CostumerId: req.user.id
        }
      };
      let condition = {
        where: {
          id: Number(req.body.id)
        }
      };
      let input = {
        CostumerId: req.user.id,
        ProductId: req.body.id,
        total: req.body.total,
        qty: req.body.qty
      };
      let fixCart;
      let exist = await Cart.findOne(productCondition);
      if (exist) {
        let updateCart = {
          qty: Number(exist.qty) + Number(req.body.qty)
        };
        fixCart = await Cart.update(updateCart, productCondition);
      } else {
        fixCart = await Cart.create(input);
      }
      let product = await Product.findOne(condition);
      let update = {
        stock: Number(product.stock) - Number(req.body.qty)
      };
      let updated = await Product.update(update, condition);
      res.status(200).json(fixCart);
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let { qty, total, ProductId, parameter } = req.body;
      let productCondition = {
        where: {
          id: ProductId
        }
      };
      let updateInput;
      let product = await Product.findOne(productCondition);
      if (parameter === "minus") {
        updateInput = {
          stock: Number(product.stock) + 1
        };
      } else {
        updateInput = {
          stock: Number(product.stock) - 1
        };
      }
      let updatedProduct = await Product.update(updateInput, productCondition);
      await Cart.update({ qty, total }, condition);
      res.status(200).json("Successfully Update Cart");
    } catch (error) {
      next(error);
    }
  }
  static async show(req, res, next) {
    try {
      let condition = {
        where: {
          CostumerId: req.user.id
        },
        include: Product
      };
      let cart = await Cart.findAll(condition);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
  static async removeProduct(req, res, next) {
    try {
      let condition = {
        where: {
          ProductId: req.params.id,
          CostumerId: req.user.id
        }
      };
      let updateCondition = {
        where: {
          id: req.params.id
        }
      };
      let oneCart = await Cart.findOne(condition);
      let product = await Product.findOne(updateCondition);
      let inputUpdate = {
        stock: Number(product.stock) + Number(oneCart.qty)
      };
      let updated = await Product.update(inputUpdate, updateCondition);
      let removed = await Cart.destroy(condition);
      if (removed) {
        res
          .status(200)
          .json({ Message: "Succesfully remove product from cart" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async destroy(req, res, next) {
    try {
      let condition = {
        where: {
          CostumerId: req.user.id
        }
      };
      let removed = await Cart.destroy(condition);
      if (removed) {
        res.status(200).json({ Message: "Succesfully delete cart" });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
