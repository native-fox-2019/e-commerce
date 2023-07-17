'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;
  const path=require('path');

  class Product extends Model{

  }

  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    category:DataTypes.STRING,
    description:DataTypes.TEXT,
    isScrapped:DataTypes.BOOLEAN
  }, {sequelize,modelName:'Product'})


  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};