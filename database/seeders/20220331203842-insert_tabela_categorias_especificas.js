'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('categorias_especificas', [
      {
        nome: 'Brinquedos',
        categorias_principais_id: 1
      },
      {
        nome: 'Roupas',
        categorias_principais_id: 1
      },
      {
        nome: 'Adereços',
        categorias_principais_id: 1
      },
      {
        nome: 'Coleiras/Guias',
        categorias_principais_id: 1
      },
      {
        nome: 'Camas',
        categorias_principais_id: 1
      },
      {
        nome: 'Tapetes',
        categorias_principais_id: 1
      },
      {
        nome: 'Rações e Petiscos',
        categorias_principais_id: 2
      },
      {
        nome: 'Vermífugos',
        categorias_principais_id: 2
      },
      {
        nome: 'Pomadas',
        categorias_principais_id: 2
      },
      {
        nome: 'Medicamentos',
        categorias_principais_id: 2
      },
      {
        nome: 'Antipulgas e Carrapatos',
        categorias_principais_id: 2
      },
      {
        nome: 'Shampoos',
        categorias_principais_id: 3
      },
      {
        nome: 'Sabonetes',
        categorias_principais_id: 3
      },
      {
        nome: 'Alicates e Tesouras',
        categorias_principais_id: 3
      },
      {
        nome: 'Perfumes',
        categorias_principais_id: 3
      },
      {
        nome: 'Cosméticos',
        categorias_principais_id: 3
      },
      {
        nome: 'Embalagens',
        categorias_principais_id: 4
      },
      {
        nome: 'Tapetes Higiênicos',
        categorias_principais_id: 4
      },
      {
        nome: 'Curativos',
        categorias_principais_id: 4
      },
      {
        nome: 'Seringas',
        categorias_principais_id: 4
      },
      {
        nome: 'Comedouros/Bebedouros Descartáveis',
        categorias_principais_id: 4
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias_especificas', null, {});
  }
};
