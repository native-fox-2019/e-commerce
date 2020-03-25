'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    usersId: DataTypes.INTEGER,
    productsId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Produk.associate = function(models) {
    // associations can be defined here
  };
  return Produk;
};