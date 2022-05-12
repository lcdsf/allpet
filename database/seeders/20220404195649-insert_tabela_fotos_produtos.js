'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fotos_produtos', [
      {
        fotourl: '/img/noimageprod.png',
        produtos_id: 1,
      },
      {
        fotourl: '/img/noimageprod.png',
        produtos_id: 2,
      },
      {
        fotourl: '/img/noimageprod.png',
        produtos_id: 3,
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos_produtos', null, {});
     
    }
};