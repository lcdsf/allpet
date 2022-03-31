'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('formas_pgto', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cartoes_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'cartoes',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        boletos_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'boletos',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        chaves_pix_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'chaves_pix',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('formas_pgto');
  }
};