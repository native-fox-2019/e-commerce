'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model {}
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },{sequelize});
  Transaction.associate = function(models) {
  Transaction.belongsTo(models.User)
  Transaction.belongsTo(models.Product)
  };
  return Transaction;
};