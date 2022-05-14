'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('compras', [
      {
        valor: 350.00,
        data: new Date(),
        clientes_id: 1,
        forma_pgto: 'Cartão'
      },
      {
        valor: 500.00,
        data: new Date(),
        clientes_id: 1,
        forma_pgto: 'Pix'
      },
      {
        valor: 99.96,
        data: new Date(),
        clientes_id: 2,
        forma_pgto: 'Boleto'
      },
      {
        valor: 16.90,
        data: new Date(),
        clientes_id: 2,
        forma_pgto: 'Pix'
      },

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras', null, {});
     
    }
};
