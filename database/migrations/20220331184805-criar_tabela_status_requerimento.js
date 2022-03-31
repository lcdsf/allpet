'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('status_requerimento', {
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
        status:{
          type: Sequelize.STRING,
          allowNull: false
        },
        requerimentos_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'requerimentos',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('status_requerimento');
  }
};
