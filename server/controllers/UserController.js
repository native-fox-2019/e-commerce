const { User } = require('../models');
const { verify } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
      let { name, email, password, role } = req.body;
      if (!role) {
        role = 'user';
      }

      const obj = {
        name,
        email,
        password,
        role
      }
      const newUser = await User.create(obj);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        next(
          {
            status: 400,
            message: "Wrong email / password",
          },
        );
        return false;
      }
      
      const valid = await verify(password, user.password)
      if (!valid) {
        next(
          {
            status: 400,
            message: "Wrong email / password",
          },
        );
        return false;
      }

      const token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;