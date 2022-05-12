'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('administradores', [
      {
        nome: 'Super',
        sobrenome: 'User da Silva',
        email: 'sudosu@allpet.com.br',
        senha: bcrypt.hashSync('12345', 10),
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Rute',
        sobrenome: 'Privilégio',
        email: 'root@root.com',
        senha: bcrypt.hashSync('12345', 10),
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Alberto',
        sobrenome: 'Chmod',
        email: 'alberto777@ls.com',
        senha: bcrypt.hashSync('2022', 10),
        data_cadastro: '2022-03-28 04:54:00'
        
      }

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('administradores', null, {});
     
    }
};
