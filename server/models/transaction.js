'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Transaction extends Model{}

  Transaction.init(
  {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {sequelize,tableName:'Transactions'}
  )

  
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Product, {foreignKey: 'ProductId'})
    Transaction.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Transaction;
};