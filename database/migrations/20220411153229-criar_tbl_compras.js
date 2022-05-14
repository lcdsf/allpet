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
        forma_pgto: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        finalizado:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        enderecos_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'enderecos',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('compras');
  }
};
