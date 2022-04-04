'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cartoes', [
      {
        tipo: 'debito',
        numero: '1111222233334444',
        cvv: '123',
        clientes_id: 1,
        validade: '2024-12-25T00:00:00.000-05:00'
      },
      {
        tipo: 'credito',
        numero: '5555666677778888',
        cvv: '321',
        clientes_id: 2,
        validade: '2024-12-25T00:00:00.000-05:00'
      },
      {
        tipo: 'credito',
        numero: '9999000011112222',
        cvv: '132',
        clientes_id: 3,
        validade: '2024-12-25T00:00:00.000-05:00'
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cartoes', null, {});
     
    }
};
