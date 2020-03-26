'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model{}
  Cart.init({
    CustId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount:{
      type: DataTypes.INTEGER,
      validate:{
        min:{
          args:[1],
          msg:"Amount Cannot be 0"
        },
        isNumeric: {
          msg:'Amount must be number'
        },  
      }
    }
  },{sequelize})

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, {foreignKey:'CustId'})
    Cart.belongsTo(models.Product, {foreignKey:'ProductId'})
  };
  return Cart;
};