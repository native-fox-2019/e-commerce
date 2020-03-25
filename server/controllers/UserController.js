const { User, Cart, Product } = require('../models');
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
      let token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });
      res.status(201).json({ token });
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

      const token = generateToken({ id: user.id, email: user.email, role: user.role });
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async getCart(req, res, next) {
    try {
      const { id } = req.userData;
      let cart = await User.findOne({ where: { id }, include: [ Product ] });
      res.status(200).json(cart.Products);
    } catch (err) {
      next(err);
    }
  };

  static async addToCart(req, res, next) {
    try {
      const ProductId = req.params.id;
      const UserId = req.userData.id;
      const existed = await Cart.findOne({ where: { ProductId, UserId } })
      if (existed) {
        const obj = {
          quantity: existed.quantity + 1,
          UserId,
          ProductId,
        };
        await Cart.update(obj, { where: { UserId, ProductId } });
      } else {
        const quantity = 1;
  
        const obj = {
          quantity,
          UserId,
          ProductId,
        };
        await Cart.create(obj);
      }
      
      let cart = await User.findOne({ where: { id: UserId }, include: [ Product ] });
      res.status(201).json(cart.Products);
    } catch (err) {
      next(err);
    }
  };

  static async updateCart(req, res, next) {
    try {
      const { quantity } = req.body;
      const ProductId = req.params.id;
      const UserId = req.userData.id;

      const obj = {
        quantity,
        UserId,
        ProductId
      }
      const updatedCart = await Cart.update(obj, { where: { ProductId, UserId } });
      res.status(200).json({ quantity });
    } catch (err) {
      next(err);
    }
  };

  static async deleteProductFromCart(req, res, next) {
    try {
      const ProductId = req.params.id;
      const UserId = req.userData.id;

      const deleted = await Cart.destroy({ where: { ProductId, UserId } });
      res.status(200).json({ message: 'Product deleted from cart' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;