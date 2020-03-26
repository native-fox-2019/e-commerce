'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    UserId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    products: DataTypes.JSON
  }, {sequelize});
  History.associate = function(models) {
    // associations can be defined here
    History.belongsTo(models.User)
  };
  return History;
};