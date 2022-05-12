'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
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
        telefone:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        cpf:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        fotourl:{
          type: Sequelize.STRING,
          allowNull: true
        },
        data_cadastro:{
            type: Sequelize.DATE,
            allowNull: false
        }

    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};
