'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('administradores', [
      {
        //1
        nome: 'Adminelson',
        sobrenome: 'da Silva',
        email: 'admin@admin.com',
        senha: bcrypt.hashSync('admin', 10),
        data_cadastro: new Date()
        
      }

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('administradores', null, {});
     
    }
};
