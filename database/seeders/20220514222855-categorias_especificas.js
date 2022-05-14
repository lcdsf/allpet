'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('categorias_especificas', [
      {
        //1
        nome: 'Brinquedos',
        categorias_principais_id: 1
      },
      {
        //2
        nome: 'Roupas',
        categorias_principais_id: 1
      },
      {
        //3
        nome: 'Adereços',
        categorias_principais_id: 1
      },
      {
        //4
        nome: 'Coleiras/Guias',
        categorias_principais_id: 1
      },
      {
        //5
        nome: 'Camas',
        categorias_principais_id: 1
      },
      {
        //6
        nome: 'Tapetes',
        categorias_principais_id: 1
      },
      {
        //7
        nome: 'Rações e Petiscos',
        categorias_principais_id: 2
      },
      {
        //8
        nome: 'Vermífugos',
        categorias_principais_id: 2
      },
      {
        //9
        nome: 'Pomadas',
        categorias_principais_id: 2
      },
      {
        //10
        nome: 'Medicamentos',
        categorias_principais_id: 2
      },
      {
        //11
        nome: 'Antipulgas e Carrapatos',
        categorias_principais_id: 2
      },
      {
        //12
        nome: 'Shampoos',
        categorias_principais_id: 3
      },
      {
        //13
        nome: 'Sabonetes',
        categorias_principais_id: 3
      },
      {
        //14
        nome: 'Alicates e Tesouras',
        categorias_principais_id: 3
      },
      {
        //15
        nome: 'Perfumes',
        categorias_principais_id: 3
      },
      {
        //16
        nome: 'Cosméticos',
        categorias_principais_id: 3
      },
      {
        //17
        nome: 'Embalagens',
        categorias_principais_id: 4
      },
      {
        //18
        nome: 'Tapetes Higiênicos',
        categorias_principais_id: 4
      },
      {
        //19
        nome: 'Curativos',
        categorias_principais_id: 4
      },
      {
        //20
        nome: 'Seringas',
        categorias_principais_id: 4
      },
      {
        //21
        nome: 'Comedouros/Bebedouros Descartáveis',
        categorias_principais_id: 4
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias_especificas', null, {});
  }
};
