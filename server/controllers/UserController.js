const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const createError = require('../helpers/createError');
const { compare } = require('../helpers/bcrypt');

class UserController {
  static async registerUser (req, res, next) {
    try {
      const { name, email, password } = req.body;
      const obj = { name, email, password, role: 'User' };
      const newUser = await User.create(obj);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
  static async loginUser (req, res, next) {
    try {
      const { email, password } = req.body;
      const userRegistered = await User.findOne({ where: { email } });
      if (!userRegistered) {
        throw createError(400, 'Wrong Username/Password');
      }
      const passwordVerification = compare(password, userRegistered.password);
      if (!passwordVerification) {
        throw createError(400, 'Wrong Username/Password');
      }
      const token = generateToken({ id: userRegistered.id });
      const role = userRegistered.role;
      res.status(200).json({ token, role });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = UserController;