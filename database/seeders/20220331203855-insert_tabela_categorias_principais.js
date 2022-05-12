'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('categorias_principais', [
      {
        nome: 'Acessórios e Brinquedos'
      },
      {
        nome: 'Saúde'
      },
      {
        nome: 'Estética'
      },
      {
        nome: 'Descartáveis'
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias_principais', null, {});
  }
};