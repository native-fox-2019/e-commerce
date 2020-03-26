'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Sabuk Mahal',
        image_url: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--M0087Q_PM2_Front%20view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}",
        price: 1000000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Backpack Mahal',
        image_url: "https://mushcart.com/wp-content/uploads/2019/05/louis-vuitton-backpack.jpg",
        price: 10000000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tas Mahal',
        image_url: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--N41413_PM1_Back%20view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}",
        price: 1500000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sepatu Mahal',
        image_url: "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--AD9U1ASC02_PM2_Front%20view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}",
        price: 500000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Koper Mahal',
        image_url: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-horizon-55-damier-graphite-canvas-travel--N23209_PM2_Front%20view.jpg",
        price: 750000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SlingBag Mahal',
        image_url: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--N41719_2_PM2_Front%20view.jpg",
        price: 8500000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dompet Mahal',
        image_url: "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--N63261_PM2_Front%20view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}",
        price: 8500000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tas Wanita Mahal',
        image_url: "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--N40135_PM2_Front%20view.jpg",
        price: 7220000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gelang Mahal',
        image_url: "https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--M6442E_PM2_Front-view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}",
        price: 829000,
        stock: 100,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
