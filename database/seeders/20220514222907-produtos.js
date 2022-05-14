'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('produtos', [
      {
        nome: 'Bolinha Maciça',
        preco: 6.99,
        descricao: 'Uma bolinha para o seu pet brincar, feita com material ultra resistente.',
        quantidade: 12,
        categorias_especificas_id: 1
      },
      {
        nome: 'Roupinha DH',
        preco: 25.00,
        descricao: 'Uma roupinha para o seu pet ser um PetDev',
        quantidade: 6,
        categorias_especificas_id: 2
      },
      {
        nome: 'Presilha Marie',
        preco: 1.99,
        descricao: 'Uma linda presilha para adornar seu animal',
        quantidade: 20,
        categorias_especificas_id: 3
      },
      {
        nome: 'Kit Coleira Bibster Spiked',
        preco: 99.90,
        descricao: 'Uma coleira que possui um mecanismo para afugentar animais ameaçadores',
        quantidade: 15,
        categorias_especificas_id: 4
      },
      {
        nome: 'Caminha SleepWell',
        preco: 59.90,
        descricao: 'Uma cama versátil e aconchegante, de fácil transporte.',
        quantidade: 11,
        categorias_especificas_id: 5
      },
      {
        nome: 'Tapete Paw and Claws',
        preco: 32.60,
        descricao: 'Um tapete que é a cara do seu animal.',
        quantidade: 10,
        categorias_especificas_id: 6
      },
      {
        nome: 'Ração FeeDog Adulto 15 kg',
        preco: 79.90,
        descricao: 'Uma ração com todos os nutrientes essenciais para o bem estar do seu cão.',
        quantidade: 25,
        categorias_especificas_id: 7
      },
      {
        nome: 'No Verme Master Kill 50mg',
        preco: 19.90,
        descricao: 'Um vermífugo poderoso para combater vermes em cães e gatos.',
        quantidade: 17,
        categorias_especificas_id: 8
      },
      {
        nome: 'Ganadol 50g',
        preco: 22.50,
        descricao: 'Pomada cicatrizante para tratamentos pós-cirúrgicos.',
        quantidade: 23,
        categorias_especificas_id: 9
      },
      {
        nome: 'AlphaOmega',
        preco: 16.90,
        descricao: 'Drágeas com Ômega 3 e complexos vitamínicos.',
        quantidade: 12,
        categorias_especificas_id: 10
      },
      {
        nome: 'NextAsGard',
        preco: 99.90,
        descricao: 'Um poderoso antipulgas e carrapatos com cápsulas palatáveis.',
        quantidade: 39,
        categorias_especificas_id: 11
      },
      {
        nome: 'Shampoo Limpet 500ml',
        preco: 19.90,
        descricao: 'Um shampoo para uso geral em pets com pelos',
        quantidade: 14,
        categorias_especificas_id: 12
      },
      {
        nome: 'Curamata',
        preco: 7.90,
        descricao: 'Sabonete que combate sarnas, pulgas e carrapatos',
        quantidade: 33,
        categorias_especificas_id: 13
      },
      {
        nome: 'Tesoura DogClaw',
        preco: 39.99,
        descricao: 'Uma tesoura com design pensado no processo de aparar as garras do seu cão.',
        quantidade: 3,
        categorias_especificas_id: 14
      },
      {
        nome: 'Cheiranimal',
        preco: 26.89,
        descricao: 'Perfume para pet com tom amadeirado.',
        quantidade: 5,
        categorias_especificas_id: 15
      },
      {
        nome: 'Creme Hidratante para patas',
        preco: 9.99,
        descricao: 'Hidrate as patas do seu animal, diga adeus às patas ásperas e ressecadas.',
        quantidade: 10,
        categorias_especificas_id: 16
      },
      {
        nome: 'Sacola Plástica 20 litros',
        preco: 11.99,
        descricao: 'Rolo com 100 unidades. Facilita na coleta do cocô do seu animal durante os passeios.',
        quantidade: 19,
        categorias_especificas_id: 17
      },
      {
        nome: 'Tapete NoPee NoPoop',
        preco: 69.99,
        descricao: '10 tapetes que acompanham sprays aromáticos para você ensinar o seu animal onde fazer suas necessidades.',
        quantidade: 13,
        categorias_especificas_id: 18
      },
      {
        nome: 'Kit Gaze e Esparadrapo',
        preco: 9.99,
        descricao: 'Um kit completo para tratar curativos do seu animal.',
        quantidade: 40,
        categorias_especificas_id: 19
      },
      {
        nome: 'Kit Seringas DescarPet',
        preco: 6.99,
        descricao: 'Kit com 5 seringas para uso geral em pets.',
        quantidade: 100,
        categorias_especificas_id: 20
      },
      {
        nome: 'Comedouro Automático 20 litros',
        preco: 149.90,
        descricao: 'Possui timer, podendo ser programados até 4 horários no dia para a liberação do alimento.',
        quantidade: 8,
        categorias_especificas_id: 21
      }
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  }
};