'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('clientes', [
      {
        //1
        nome: 'Joãozinho',
        sobrenome: 'Silva',
        email: 'jao@jao.com',
        senha: bcrypt.hashSync('123', 10),
        telefone: '65996661111',
        cpf: '00011122233',
        fotourl: 'defaultprofile.jpg',
        data_cadastro: new Date()
        
      },
      {
        //2
        nome: 'Mariazinha',
        sobrenome: 'Lemes',
        email: 'maria@maria.com',
        senha: bcrypt.hashSync('123', 10),
        telefone: '8436881111',
        cpf: '44455566677',
        fotourl: 'defaultprofile.jpg',
        data_cadastro: new Date()
        
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
