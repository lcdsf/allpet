'use strict';

'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'produtos',
      'fotourl',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'produtos',
      'fotourl'
    );
  }
}

