'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('requerimentos', [
      {
        datahora: '2024-12-25T00:00:00.000-05:00',
        motivo: 'Meu produto ainda não foi entregue',
        compras_id: 1
      },
      {
        datahora: '2024-12-25T00:00:00.000-05:00',
        motivo: 'Um ou mais produtos vieram avariados/com defeito',
        compras_id: 2
      },
      {
        datahora: '2024-12-25T00:00:00.000-05:00',
        motivo: 'Me arrependi da compra',
        compras_id: 3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requerimentos', null, {});
     
    }
};