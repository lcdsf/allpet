'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_compra', [
      {
        status: 'Pedido recebido pela loja',
        data: '2024-12-25T00:00:00.000-05:00',
        compras_id: 1
      },
      {
        status: 'Pedido encaminhado ao Depósito para despacho',
        data: '2024-12-25T00:00:00.000-05:00',
        compras_id: 1
      },
      {
        status: 'Pedido recebido pela loja',
        data: '2024-12-25T00:00:00.000-05:00',
        compras_id: 2
      },
      {
        status: 'Cancelamento da compra feita pelo cliente',
        data: '2024-12-25T00:00:00.000-05:00',
        compras_id: 2
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_compra', null, {});
     
    }
};
