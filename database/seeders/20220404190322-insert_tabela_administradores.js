'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('administradores', [
      {
        nome: 'Super',
        sobrenome: 'User da Silva',
        email: 'sudosu@allpet.com.br',
        senha: '12345',
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Rute',
        sobrenome: 'Privilégio',
        email: 'root@root.com',
        senha: '12346',
        data_cadastro: '2022-03-28 04:54:00'
        
      },
      {
        nome: 'Alberto',
        sobrenome: 'Chmod',
        email: 'alberto777@ls.com',
        senha: '12345',
        data_cadastro: '2022-03-28 04:54:00'
        
      }

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('administradores', null, {});
     
    }
};
