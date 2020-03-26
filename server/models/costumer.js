"use strict";
const { hashed } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Costumer extends Model {}

  Costumer.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: {
            args: true,
            msg: "Invalid Email Format"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashed(instance.password);
        }
      },
      sequelize
    }
  );

  Costumer.associate = function(models) {
    Costumer.belongsToMany(models.Product, {
      through: "Carts",
      foreignKey: "ProductId"
    });
  };
  return Costumer;
};
