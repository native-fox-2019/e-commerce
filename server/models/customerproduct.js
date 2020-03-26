'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerProduct = sequelize.define('CustomerProduct', {
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status_order: DataTypes.BOOLEAN
  }, {});
  CustomerProduct.associate = function(models) {
    // associations can be defined here
  };
  return CustomerProduct;
};