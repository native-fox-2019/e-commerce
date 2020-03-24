'use strict';
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Name can not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Email can not be empty" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: "Password can not be empty" },
      },
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (instance, options) => {
        const hashed = await hash(instance.password);
        instance.password = hashed;
      },
    },
  });
  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: models.Cart });
  };
  return User;
};