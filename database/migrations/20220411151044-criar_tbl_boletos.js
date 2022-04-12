'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('boletos', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        linhadigitavel:{
            type: Sequelize.STRING,
            allowNull: false
        },
        datavencto:{
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('boletos');
  }
};