/** @format */

"use strict";
const { User } = require("../models");
const { comparePass } = require("../helper/passwordHelper");
const { generateTok } = require("../helper/tokenHelper");
const adminList = require("../helper/adminList");

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(data => {
        if (data && comparePass(password, data.password)) {
          res.status(200)
          .json({token: generateTok({ id: data.id, email: data.email,isAdmin: data.isAdmin}), first_name : data.first_name, last_name : data.last_name, email : data.email}) 

        } else {
          const error = {
            status: 400,
            msg: "email or password wrong!"
          };
          throw error;
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static register(req, res, next) {
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: null
    }
    adminList.adminList.forEach(element => {
      if (element === req.body.email) {
        body.isAdmin = true
      } else {
        body.isAdmin = false
      }
    });
    User.create(body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
