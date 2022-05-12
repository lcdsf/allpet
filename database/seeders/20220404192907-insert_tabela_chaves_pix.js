'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chaves_pix', [
      {
        tipochave: 'telefone',
        chave: '06588887777',
      },
      {
        tipochave: 'cnpj',
        chave: '13222666000144',
      },
      {
        tipochave: 'email',
        chave: 'pix@allpet.com.br',
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chaves_pix', null, {});
     
    }
};
