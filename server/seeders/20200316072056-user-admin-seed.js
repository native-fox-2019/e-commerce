'use strict';
const bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [
    {
    email:`bram@gmail.com`,
    password: bcrypt.hashSync(`bram123`, salt),
    isadmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
    },
], {});


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

   return queryInterface.bulkDelete('Users', null, {});
  }
};
