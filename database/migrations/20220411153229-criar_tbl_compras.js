'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('compras', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valor:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        data:{
          type: Sequelize.DATE,
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
        formas_pgto_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'formas_pgto',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        /*produtos_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'itens_compras',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }*/
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('compras');
  }
};
