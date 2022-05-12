'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('itens_carrinho', { 
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
      clientes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      produtos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produtos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }

    });

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('itens_carrinho');

  }
};
