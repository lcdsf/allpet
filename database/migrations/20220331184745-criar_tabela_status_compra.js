'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('status_compra', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false
        },
        data:{
          type: Sequelize.DATE,
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('status_compra');
  }
};
