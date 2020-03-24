'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name cannot empty'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notMinus: (price) => {
          if (price < 0) {
            throw new Error('Price cannot negative')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notMinus: (stock) => {
          if (stock < 0) {
            throw new Error('Stock cannot negative')
          }
        }
      }
    },
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize
  })

  Product.associate = function (models) {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Product.belongsTo(models.Order, {
      foreignKey: 'product_id'
    })
  };
  return Product;
};