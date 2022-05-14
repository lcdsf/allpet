'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('categorias_principais', [
      {
        //1
        nome: 'Acessórios e Brinquedos'
      },
      {
        //2
        nome: 'Saúde'
      },
      {
        //3
        nome: 'Estética'
      },
      {
        //4
        nome: 'Descartáveis'
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias_principais', null, {});
  }
};