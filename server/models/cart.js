"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      CostumerId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          notNull: true,
          min: 0
        }
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          notNull: true,
          min: 0
        }
      }
    },
    {}
  );
  Cart.associate = function(models) {
    Cart.belongsTo(models.Costumer);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};
