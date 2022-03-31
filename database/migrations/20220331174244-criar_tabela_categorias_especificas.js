'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categorias_especificas', {
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
        categorias_principais_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categorias_principais',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categorias_especificas');
  }
};