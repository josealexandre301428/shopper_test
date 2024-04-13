'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      code: {
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      cost_price: {
        type: Sequelize.DECIMAL(9,2)
      },
      sales_price: {
        type: Sequelize.DECIMAL(9,2)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};