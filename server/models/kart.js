'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kart = sequelize.define('Kart', {
    usersId: DataTypes.INTEGER,
    productsId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Kart.associate = function(models) {
    // associations can be defined here
  };
  return Kart;
};