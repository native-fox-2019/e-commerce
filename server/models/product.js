'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Product Name can not be empty" },
        notEmpty: { msg: "Product Name can not be empty" }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Product Image Url can not be empty" },
        notEmpty: { msg: "Product Image Url can not be empty" }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [[0]],
          msg: "Product Price can not be negatives"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [[0]],
          msg: "Product Stock can not be negatives"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Product Category can not be empty" },
        notEmpty: { msg: "Product Category can not be empty" }
      }
    }
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.User);
  };
  return Product;
};