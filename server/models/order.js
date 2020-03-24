'use strict';
module.exports = (sequelize, DataTypes) => {
  class Order extends sequelize.Sequelize.Model {}

  Order.init({
    code: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize
  })

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Order.belongsTo(models.Product, {
      foreignKey: 'product_id'
    })
  };
  return Order;
};