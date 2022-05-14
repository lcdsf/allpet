'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fotos_produtos', [
      {fotourl: 'defaultprod.png', produtos_id: 1,},
      {fotourl: 'defaultprod.png', produtos_id: 1,},
      {fotourl: 'defaultprod.png', produtos_id: 1,},
      {fotourl: 'defaultprod.png', produtos_id: 1,},

      {fotourl: 'defaultprod.png', produtos_id: 2,},
      {fotourl: 'defaultprod.png', produtos_id: 2,},
      {fotourl: 'defaultprod.png', produtos_id: 2,},
      {fotourl: 'defaultprod.png', produtos_id: 2,},

      {fotourl: 'defaultprod.png', produtos_id: 3,},
      {fotourl: 'defaultprod.png', produtos_id: 3,},
      {fotourl: 'defaultprod.png', produtos_id: 3,},
      {fotourl: 'defaultprod.png', produtos_id: 3,},

      {fotourl: 'defaultprod.png', produtos_id: 4,},
      {fotourl: 'defaultprod.png', produtos_id: 4,},
      {fotourl: 'defaultprod.png', produtos_id: 4,},
      {fotourl: 'defaultprod.png', produtos_id: 4,},

      {fotourl: 'defaultprod.png', produtos_id: 5,},
      {fotourl: 'defaultprod.png', produtos_id: 5,},
      {fotourl: 'defaultprod.png', produtos_id: 5,},
      {fotourl: 'defaultprod.png', produtos_id: 5,},

      {fotourl: 'defaultprod.png', produtos_id: 6,},
      {fotourl: 'defaultprod.png', produtos_id: 6,},
      {fotourl: 'defaultprod.png', produtos_id: 6,},
      {fotourl: 'defaultprod.png', produtos_id: 6,},

      {fotourl: 'defaultprod.png', produtos_id: 7,},
      {fotourl: 'defaultprod.png', produtos_id: 7,},
      {fotourl: 'defaultprod.png', produtos_id: 7,},
      {fotourl: 'defaultprod.png', produtos_id: 7,},

      {fotourl: 'defaultprod.png', produtos_id: 8,},
      {fotourl: 'defaultprod.png', produtos_id: 8,},
      {fotourl: 'defaultprod.png', produtos_id: 8,},
      {fotourl: 'defaultprod.png', produtos_id: 8,},
      
      {fotourl: 'defaultprod.png', produtos_id: 9,},
      {fotourl: 'defaultprod.png', produtos_id: 9,},
      {fotourl: 'defaultprod.png', produtos_id: 9,},
      {fotourl: 'defaultprod.png', produtos_id: 9,},

      {fotourl: 'defaultprod.png', produtos_id: 10,},
      {fotourl: 'defaultprod.png', produtos_id: 10,},
      {fotourl: 'defaultprod.png', produtos_id: 10,},
      {fotourl: 'defaultprod.png', produtos_id: 10,},

      {fotourl: 'defaultprod.png', produtos_id: 11,},
      {fotourl: 'defaultprod.png', produtos_id: 11,},
      {fotourl: 'defaultprod.png', produtos_id: 11,},
      {fotourl: 'defaultprod.png', produtos_id: 11,},

      {fotourl: 'defaultprod.png', produtos_id: 12,},
      {fotourl: 'defaultprod.png', produtos_id: 12,},
      {fotourl: 'defaultprod.png', produtos_id: 12,},
      {fotourl: 'defaultprod.png', produtos_id: 12,},

      {fotourl: 'defaultprod.png', produtos_id: 13,},
      {fotourl: 'defaultprod.png', produtos_id: 13,},
      {fotourl: 'defaultprod.png', produtos_id: 13,},
      {fotourl: 'defaultprod.png', produtos_id: 13,},

      {fotourl: 'defaultprod.png', produtos_id: 14,},
      {fotourl: 'defaultprod.png', produtos_id: 14,},
      {fotourl: 'defaultprod.png', produtos_id: 14,},
      {fotourl: 'defaultprod.png', produtos_id: 14,},

      {fotourl: 'defaultprod.png', produtos_id: 15,},
      {fotourl: 'defaultprod.png', produtos_id: 15,},
      {fotourl: 'defaultprod.png', produtos_id: 15,},
      {fotourl: 'defaultprod.png', produtos_id: 15,},

      {fotourl: 'defaultprod.png', produtos_id: 16,},
      {fotourl: 'defaultprod.png', produtos_id: 16,},
      {fotourl: 'defaultprod.png', produtos_id: 16,},
      {fotourl: 'defaultprod.png', produtos_id: 16,},

      {fotourl: 'defaultprod.png', produtos_id: 17,},
      {fotourl: 'defaultprod.png', produtos_id: 17,},
      {fotourl: 'defaultprod.png', produtos_id: 17,},
      {fotourl: 'defaultprod.png', produtos_id: 17,},

      {fotourl: 'defaultprod.png', produtos_id: 18,},
      {fotourl: 'defaultprod.png', produtos_id: 18,},
      {fotourl: 'defaultprod.png', produtos_id: 18,},
      {fotourl: 'defaultprod.png', produtos_id: 18,},

      {fotourl: 'defaultprod.png', produtos_id: 19,},
      {fotourl: 'defaultprod.png', produtos_id: 19,},
      {fotourl: 'defaultprod.png', produtos_id: 19,},
      {fotourl: 'defaultprod.png', produtos_id: 19,},

      {fotourl: 'defaultprod.png', produtos_id: 20,},
      {fotourl: 'defaultprod.png', produtos_id: 20,},
      {fotourl: 'defaultprod.png', produtos_id: 20,},
      {fotourl: 'defaultprod.png', produtos_id: 20,},

      {fotourl: 'defaultprod.png', produtos_id: 21,},
      {fotourl: 'defaultprod.png', produtos_id: 21,},
      {fotourl: 'defaultprod.png', produtos_id: 21,},
      {fotourl: 'defaultprod.png', produtos_id: 21,},

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos_produtos', null, {});
     
    }
};