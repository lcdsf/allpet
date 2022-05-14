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
        descricao: 'Não gostei muito, pois meu animal não se adaptou ao produto.',
        datahora: new Date(),
        nota: 5.5,
        produtos_id: 1,
        clientes_id: 2,
      }
      
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avaliacoes', null, {});
     
    }
};