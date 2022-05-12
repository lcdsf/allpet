'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('produtos', [
      {
        nome: 'Kit Coleira Bibster Spiked',
        preco: 100.00,
        descricao: 'Uma coleira que possui um mecanismo para afugentar animais ameaçadores',
        quantidade: 15,
        categorias_especificas_id: 4
      },
      {
        nome: 'Ganadol',
        preco: 15.00,
        descricao: 'Pomada cicatrizante, muito usada para tratamento pós-cirúrgico',
        quantidade: 80,
        categorias_especificas_id: 9
      },
      {
        nome: 'Comedouro ComeCome 500ml',
        preco: 22.90,
        descricao: 'Comedouro de plástico para uso geral de pets',
        quantidade: 28,
        categorias_especificas_id: 21
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  }
};