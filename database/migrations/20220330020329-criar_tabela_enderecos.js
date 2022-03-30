'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', {
      id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      rua:{
          type: Sequelize.STRING,
          allowNull: false
      },
      numero:{
          type: Sequelize.INTEGER,
          allowNull: false
      },
      bairro:{
          type: Sequelize.STRING,
          allowNull: false
      },
      cidade:{
          type: Sequelize.STRING,
          allowNull: false
      },
      estado:{
          type: Sequelize.STRING,
          allowNull: false
      },
      complemento:{
          type: Sequelize.STRING,
          allowNull: true
      },
      clientes_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'clientes',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      }

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('enderecos');
  }
};
