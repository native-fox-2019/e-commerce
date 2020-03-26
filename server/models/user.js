'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;
  const md5=require('md5');

  class User extends Model{
    static validateRegisterInput(body,errors){
      if(!body.username){
        errors.push('Username must be filled')
      }
      if(!body.password){
        errors.push('password must be filled')
      }
      if(!body.email){
        errors.push('email must be filled')
      }
      if(!body.name){
        errors.push('name must be filled')
      }
      if(errors.length)
        return false
      return true
    }

    get tokendata(){
      return {
        id:this.id,
        username:this.username,
        email:this.email,
        name:this.name
      }
    }
  }

  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM(['user','admin']),
    username: {
      type:DataTypes.STRING,
      validate:{
        isUsername(value){
          let spaceReg=/\s+/g;
          if(spaceReg.test(value)){
            throw new Error('Username contains white space')
          }
        }
      }
    },
    name: DataTypes.STRING
  }, {sequelize,modelName:'User'})

  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate((instance,options)=>{
    instance.password=md5(instance.password);
  })

  User.beforeBulkUpdate((instance)=>{
    if(instance.password)
      instance.password=md5(instance.password);
  })

  return User;
};