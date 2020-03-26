/** @format */

"use strict";
const { Product } = require("../models");
const { User } = require("../models");

class productController {
  static create(req, res, next) {
    const UserId = req.user.id;
    const body = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image_url: req.body.image_url,
      stock: req.body.stock,
      price: req.body.price,
      UserId: UserId
    };
    Product.create(body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static findAll(req, res, next) {
    Product.findAll()
      .then(data => {
        if (data.length) {
          res.status(200).json(data);
        } else {
          const error = {
            status: 404,
            msg: "data not found"
          };
          throw error;
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    const Id = req.params.id;
    Product.findOne({where : {id : Id}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        const error = {
          status: 404,
          msg: "data not found"
        };
        next(error)
      })
  }

  static update(req, res, next) {
    const id = +req.params.id;
    const { name, description, image_url, price, stock, category } = req.body;
    Product.update(
      { name, description, image_url, price, stock, category },
      { where: { id: id }, returning: true }
    )
      .then(data => {
        if (data[1].length) {
          res.status(200).json(data[1]);
        } else {
          const error = {
            status: 404,
            msg: "data not found"
          };
          throw error;
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const id = +req.params.id;
    Product.destroy({ where: { id }, returning: true })
      .then(data => {
        if (data > 0) {
          res.status(200).json("delete succesfull");
        } else {
          const error = {
            status: 404,
            msg: "data not found"
          };
          throw error;
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = productController;
