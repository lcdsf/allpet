'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('requerimentos', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        datahora:{
            type: Sequelize.DATE,
            allowNull: false
        },
        motivo:{
          type: Sequelize.STRING,
          allowNull: false
        },
        finalizado:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('requerimentos');
  }
};
