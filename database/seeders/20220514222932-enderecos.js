'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('enderecos', [
      {
        cep: '78850000',
        rua: 'Giotto',
        numero: 23,
        bairro: 'Jardim Florença',
        cidade: 'Primavera do Leste',
        estado: 'MT',
        complemento: 'Quadra 03',
        clientes_id: 1
      },
      {
        cep: '78881000',
        rua: 'Chile',
        numero: 95,
        bairro: 'Vila Poxoréu',
        cidade: 'Poxoréu',
        estado: 'MT',
        complemento: 'Ao lado do Bar do Zezinho',
        clientes_id: 1
      },
      {
        cep: '99850000',
        rua: 'Senador Flinto Muller',
        numero: 2012,
        bairro: 'Centro',
        cidade: 'Limeira',
        estado: 'SP',
        complemento: 'Bloco 5',
        clientes_id: 2
      },
      {
        cep: '82820000',
        rua: 'B',
        numero: 12,
        bairro: 'Novo Horizonte',
        cidade: 'Seropédica',
        estado: 'RJ',
        complemento: null,
        clientes_id: 2
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enderecos', null, {});
  }
};
