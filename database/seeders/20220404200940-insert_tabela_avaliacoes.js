'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('avaliacoes', [
      {
        descricao: 'Um belíssimo produto, aprovado!',
        datahora: new Date(),
        nota: 9.5,
        produtos_id: 1,
        clientes_id: 1,
      },
      {
        descricao: 'Não gostei muito, pois meu cachorro ficou com alergia.',
        datahora: new Date(),
        nota: 5.5,
        produtos_id: 1,
        clientes_id: 2,
      },
      {
        descricao: 'Ótimo produto, agora meu animal pode passear em paz.',
        datahora: new Date(),
        nota: 10,
        produtos_id: 1,
        clientes_id: 1,
      },
      {
        descricao: 'Superou as expectativas, muito bom!',
        datahora: new Date(),
        nota: 10,
        produtos_id: 2,
        clientes_id: 2,
      },
      {
        descricao: 'Eu acho que o valor pago pelo produto está além do esperado.',
        datahora: new Date(),
        nota: 6.5,
        produtos_id: 3,
        clientes_id: 3,
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avaliacoes', null, {});
     
    }
};