'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cartoes', {
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
        numero:{
          type: Sequelize.STRING,
          allowNull: false
        },
        cvv:{
          type: Sequelize.STRING,
          allowNull: false
        },
        validade:{
          type: Sequelize.STRING,
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cartoes');
  }
};