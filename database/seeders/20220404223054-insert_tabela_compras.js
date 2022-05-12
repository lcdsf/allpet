'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('compras', [
      {
        valor: 350.00,
        data: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 1,
        formas_pgto_id: 1
      },
      {
        valor: 29.99,
        data: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 1,
        formas_pgto_id: 2
      },
      {
        valor: 1855.42,
        data: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 2,
        formas_pgto_id: 3
      },
      {
        valor: 35,
        data: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 3,
        formas_pgto_id: 2
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras', null, {});
     
    }
};
