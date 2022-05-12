'use strict';

'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'avaliacoes',
      'nota',
      {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'avaliacoes',
      'nota'
    );
  }
}

