'use strict';
let bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Customer extends Model{}
  Customer.init({
    email:{
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }, 
    password: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize})
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsToMany(models.Product, {through: models.CustomerProduct, foreignKey:'CustomerId'})
  };
  return Customer;
};