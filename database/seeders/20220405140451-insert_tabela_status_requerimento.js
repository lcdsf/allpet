'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_requerimento', [
      {
        status: 'Requerimento recebido',
        datahora: '2024-12-25T00:00:00.000-05:00',
        requerimentos_id: 1
      },
      {
        status: 'Em análise',
        datahora: '2024-12-25T00:00:00.000-05:00',
        requerimentos_id: 1
      },
      {
        status: 'Requerimento recebido',
        datahora: '2024-12-25T00:00:00.000-05:00',
        requerimentos_id: 2
      },
      {
        status: 'Em análise',
        datahora: '2024-12-25T00:00:00.000-05:00',
        requerimentos_id: 2
      },
      {
        status: 'Reembolso realizado',
        datahora: '2024-12-25T00:00:00.000-05:00',
        requerimentos_id: 2
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_requerimento', null, {});
     
    }
};
