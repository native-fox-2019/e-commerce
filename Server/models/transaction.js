'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class Transaction extends Model{}

  Transaction.init({
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {sequelize})

  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {foreignKey: 'UserId'});
    Transaction.belongsTo(models.Product, {foreignKey: 'ProductId'});
  };
  return Transaction;
};