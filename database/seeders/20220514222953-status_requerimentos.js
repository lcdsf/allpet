'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_requerimentos', [
      {
        status: 'Requerimento recebido',
        datahora: new Date(),
        requerimentos_id: 1
      },
      {
        status: 'Em análise',
        datahora: new Date(Date.now()+(3600*1000*24)),
        requerimentos_id: 1
      },
      {
        status: 'Requerimento recebido',
        datahora: new Date(Date.now()+(3600*1000*28)),
        requerimentos_id: 2
      },
      {
        status: 'Em análise',
        datahora:new Date(Date.now()+(3600*1000*36)),
        requerimentos_id: 2
      },
      {
        status: 'Reembolso realizado',
        datahora: new Date(Date.now()+(3600*1000*48)),
        requerimentos_id: 2
      },
      {
        status: 'Requerimento recebido',
        datahora: new Date(),
        requerimentos_id: 3
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_requerimentos', null, {});
     
    }
};
