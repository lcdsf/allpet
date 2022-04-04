'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('boletos', [
      {
        linhadigitavel: '2154645124562145851485485818',
        datavencto: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 1,
      },
      {
        linhadigitavel: '2374623643242356236578436545',
        datavencto: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 1,
      },
      {
        linhadigitavel: '7898977059650904596075677777',
        datavencto: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 2,
      },
      {
        linhadigitavel: '5435353676576688786878768768',
        datavencto: '2024-12-25T00:00:00.000-05:00',
        clientes_id: 3,
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('boletos', null, {});
     
    }
};
