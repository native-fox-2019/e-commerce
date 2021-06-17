'use strict';

const { makeSeeder } = require('../utils');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return makeSeeder('Banners', queryInterface);
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkDelete('Banners', null, {});
    
  }
};
