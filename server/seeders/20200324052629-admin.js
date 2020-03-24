'use strict';
const bcrypt = require(`../helpers/bcrypt`)

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      email: `admin@admin.com`,
      password: bcrypt.hashing(`admin`),
      role: `admin`,
      updatedAt: new Date(),
      createdAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', {
       email: `admin@admin.com`
     }, {});
  }
};
