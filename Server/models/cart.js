'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class Cart extends Model{}

  Cart.init({
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {sequelize})

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foiregnKey: 'UserId'});
    Cart.belongsTo(models.Product, { foriegnKey: 'ProductId'})
  };
  return Cart;
};