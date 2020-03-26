const { Costumer } = require("../models");
const createError = require("http-errors");
const { sign } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");

class Controller {
  static async login(req, res, next) {
    try {
      let { email } = req.body;
      let condition = {
        where: { email }
      };
      let { id, fullname, password } = await Costumer.findOne(condition);
      if (compare(req.body.password, password)) {
        let access_token = sign({ id, fullname });
        res.status(200).json({ access_token, fullname });
      }
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      let { fullname, email, password } = req.body;
      let create = await Costumer.create({ fullname, email, password });
      let access_token = sign({ id: create.id, fullname: create.fullname });
      res.status(201).json({ access_token, fullname });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
