'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')

  class User extends Model{}
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Fisrt name can't be null!"
        },
        notEmpty: {
          msg: "Fisrt name can't be empty!"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name can't be null!"
        },
        notEmpty: {
          msg: "Last name can't be empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email can't be null!"
        },
        notEmpty: {
          msg: "Email can't be empty!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password can't be null!"
        },
        notEmpty: {
          msg: "Password can't be empty!"
        }
      }
    }
  }, 
  {
    hooks: {
      beforeSave(user, options) {
        return hash(user.password)
        .then(hashed => {
          user.password = hashed
        })
      }
    }, 
    sequelize 
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};