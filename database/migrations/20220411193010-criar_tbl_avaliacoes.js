'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacoes', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        datahora:{
          type: Sequelize.DATE,
          allowNull: false
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('avaliacoes');
  }
};
