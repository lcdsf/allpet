'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('itens_compras', [
      {
        quantidade: 5,
        compras_id: 1,
        produtos_id: 1
      },
      {
        quantidade: 4,
        compras_id: 1,
        produtos_id: 2
      },
      {
        quantidade: 10,
        compras_id: 1,
        produtos_id: 3
      },
      {
        quantidade: 12,
        compras_id: 2,
        produtos_id: 3
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('itens_compras', null, {});
     
    }
};

