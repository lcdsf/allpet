'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('administradores', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        sobrenome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false
        },
        data_cadastro:{
            type: Sequelize.DATE,
            allowNull: false
        }

    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('administradores');
  }
};