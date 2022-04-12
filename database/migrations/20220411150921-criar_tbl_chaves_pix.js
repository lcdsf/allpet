'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chaves_pix', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipochave:{
            type: Sequelize.STRING,
            allowNull: false
        },
        chave:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chaves_pix');
  }
};