'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model { }

  Product.init = ({
    name: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: `Name must not be empty!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        notNull: {
          msg: `Price can't be empty`
        },
        min: {
          args: 1,
          msg: `Price can't be 0 or less!`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        notNull: {
          msg: `Stock can't be empty`
        },
        min: {
          args: 1,
          msg: `Stock can't be 0 or less!`
        }
      }
    }
  }, { sequelize });
  Product.associate = function (models) {
    // Product.belongsTo(models.User) // not working?
    // Product.belongsTo(models.User)
  };
  return Product;
};