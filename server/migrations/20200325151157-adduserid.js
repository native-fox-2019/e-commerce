'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

      return queryInterface.addColumn('Products', "UserId" ,Sequelize.INTEGER );
    

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn('Products', "UserId" );

  }
};
