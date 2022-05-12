'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fotos_produtos', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fotourl:{
            type: Sequelize.STRING,
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
        }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('fotos_produtos');
  }
};
