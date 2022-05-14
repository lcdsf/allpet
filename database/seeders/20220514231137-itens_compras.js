'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('itens_compras', [
      {
        quantidade: 5,
        compras_id: 1,
        produtos_id: 14
      },
      {
        quantidade: 4,
        compras_id: 1,
        produtos_id: 5
      },
      {
        quantidade: 10,
        compras_id: 1,
        produtos_id: 8
      },
      {
        quantidade: 12,
        compras_id: 2,
        produtos_id: 3
      },
      {
        quantidade: 1,
        compras_id: 2,
        produtos_id: 10
      },
      {
        quantidade: 1,
        compras_id: 3,
        produtos_id: 20
      },
      {
        quantidade: 1,
        compras_id: 4,
        produtos_id: 16
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('itens_compras', null, {});
     
    }
};

