'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_compras', [
      {
        status: 'Pedido recebido pela loja',
        data: new Date(),
        compras_id: 1
      },
      {
        status: 'Pedido encaminhado ao Depósito para despacho',
        data: new Date(Date.now()+(3600*1000*1)),
        compras_id: 1
      },
      {
        status: 'Pedido recebido pela loja',
        data: new Date(),
        compras_id: 2
      },
      {
        status: 'Cancelamento da compra feita pelo cliente',
        data: new Date(Date.now()+(3600*1000*48)),
        compras_id: 2
      },
      {
        status: 'Pedido recebido pela loja',
        data: new Date(),
        compras_id: 3
      },
      {
        status: 'Pedido recebido pela loja',
        data: new Date(),
        compras_id: 4
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_compras', null, {});
     
    }
};
