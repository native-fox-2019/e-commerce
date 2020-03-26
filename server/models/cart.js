'use strict';
module.exports = (sequelize, DataTypes) => {
  let models = sequelize.Sequelize.Model
  class Cart extends models { }
  Cart.init({
    usersId: DataTypes.INTEGER,
    productsId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: {
      type: DataTypes.INTEGER,
      min: 1
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      min: 1
    }
  }, { sequelize })
  // const Cart = sequelize.define('Cart', );
  Cart.associate = function (models) {
    // associations can be defined here
  };
  return Cart;
};