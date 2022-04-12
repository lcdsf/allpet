'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('itens_compras', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quantidade:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        compras_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'compras',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        produtos_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'itens_compras',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('itens_compras');
  }
};
