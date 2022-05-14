'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
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
        preco:{
          type: Sequelize.FLOAT,
          allowNull: false
        },
        descricao:{
          type: Sequelize.STRING,
          allowNull: false
        },
        quantidade:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        categorias_especificas_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categorias_especificas',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};