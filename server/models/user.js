'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const bcrypt = require(`../helpers/bcrypt`)

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
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = bcrypt.hashing(instance.password)
      }
    },
    sequelize
  });
  User.associate = function (models) {
  };
  return User;
};