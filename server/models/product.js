'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    // Product.belongsToMany(models.User, { through: 'Cart' });
    Product.belongsTo(models.User)

  };
  return Product;
};