'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('avaliacoes', [
      {
        descricao: 'Um belíssimo produto, aprovado!',
        datahora: '2024-12-25T00:00:00.000-05:00',
        produtos_id: 1,
        clientes_id: 1,
      },
      {
        descricao: 'Superou as expectativas, muito bom!',
        datahora: '2024-12-25T00:00:00.000-05:00',
        produtos_id: 2,
        clientes_id: 2,
      },
      {
        descricao: 'Eu acho que o valor pago pelo produto está além do esperado.',
        datahora: '2024-12-25T00:00:00.000-05:00',
        produtos_id: 3,
        clientes_id: 3,
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avaliacoes', null, {});
     
    }
};