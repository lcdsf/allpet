'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'compras',
      'enderecos_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'enderecos',
          key: 'id'
        }
      }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'compras',
      'enderecos_id'
    );
  }
}
