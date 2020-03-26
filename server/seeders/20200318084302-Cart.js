'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Carts",
      [
        {
          ProductId: 4,
          UserId: 2,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ProductId: 4,
          UserId: 2,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ProductId: 5,
          UserId: 2,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
