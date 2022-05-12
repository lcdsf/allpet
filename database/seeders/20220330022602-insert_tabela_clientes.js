'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('clientes', [
      {
        nome: 'Joãozinho',
        sobrenome: 'Silva',
        email: 'jao@jao.com',
        senha: '12345',
        telefone: '123456781',
        cpf: '11111111111',
        fotourl: '/public/noprofile.png',
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Mariazinha',
        sobrenome: 'Silva',
        email: 'mari@maria.com',
        senha: '12346',
        telefone: '123456789',
        cpf: '11111111112',
        fotourl: '/public/noprofile.png',
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Givaldo',
        sobrenome: 'Mendes',
        email: 'gigi@beggar.com',
        senha: '12345',
        telefone: '123456780',
        cpf: '11111111113',
        fotourl: '/public/noprofile.png',
        data_cadastro: '2022-03-28 04:54:00'
        
      }

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
