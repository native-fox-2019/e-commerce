'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class user extends Model { }

  user.init = ({
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
          
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, { sequelize });
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};