'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('formas_pgto', [
      {
        tipo: 'cartao',
        cartoes_id: 1,
      },
      {
        tipo: 'boleto',
        boletos_id: 2,
      },
      {
        tipo: 'pix',
        chaves_pix_id: 3,
      },
      {
        tipo: 'cartao',
        cartoes_id: 2,
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('formas_pgto', null, {});
     
    }
};
