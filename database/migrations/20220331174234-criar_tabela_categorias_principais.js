'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categorias_principais', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categorias_principais');
  }
};
