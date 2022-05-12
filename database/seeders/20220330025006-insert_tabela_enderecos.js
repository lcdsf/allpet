'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('enderecos', [
      {
        rua: 'Mangueira',
        numero: 1475,
        bairro: '3 Américas',
        cidade: 'Primavera do Leste',
        estado: 'MT',
        complemento: 'Quadra 03',
        clientes_id: 1
      },
      {
        rua: 'Senador Flinto Muller',
        numero: 2012,
        bairro: 'Centro',
        cidade: 'Limeira',
        estado: 'SP',
        complemento: 'Bloco 5',
        clientes_id: 2
      },
      {
        rua: 'Mirassol',
        numero: 123,
        bairro: 'Vila Florença',
        cidade: 'Campo dos Goytacazes',
        estado: 'RJ',
        complemento: '',
        clientes_id: 3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enderecos', null, {});
  }
};
