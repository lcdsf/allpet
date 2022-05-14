'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('requerimentos', [
      {
        datahora: new Date(),
        motivo: 'Meu produto ainda não foi entregue',
        compras_id: 1
      },
      {
        datahora: new Date(),
        motivo: 'Um ou mais produtos vieram avariados/com defeito',
        compras_id: 2
      },
      {
        datahora: new Date(),
        motivo: 'Me arrependi da compra',
        compras_id: 3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requerimentos', null, {});
     
    }
};