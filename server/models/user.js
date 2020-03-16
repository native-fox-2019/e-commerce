'use strict';
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require(`../helpers/bcrypt`)
  const Model = sequelize.Sequelize.Model

  class User extends Model { }

  User.init = ({
    email: {
      type: DataTypes.STRING,
      validation: {
        isEmail: {
          msg: `Not a valid email format!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: `Password can't be empty!`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: `user`
    }
  }, { sequelize,
  hooks: {
    beforeCreate: (instance, options) => {
      instance.password = bcrypt.hash(instance.password)
    }
  } });
  User.associate = function (models) {
  };
  return User;
};