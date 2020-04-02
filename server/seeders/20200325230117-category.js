'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'baju',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'jaket',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'celana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sepatu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'banner',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { sequelize });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
