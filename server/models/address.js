'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Address extends Model{}

  Address.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      address: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      phone: DataTypes.STRING
    }, {sequelize,tableName:'Addresses'}
  )

  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Address;
};