'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@halcon.com',
        password: '$2a$10$baxj7U4mSfFmDb77SqpuFudoF.fipbn3nNcysOP1Pw4MrqKquyNtO', // contra es 'prueba123'
        role: 'admin',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jose Salazar',
        email: 'josesalazar@halcon.com',
        password: '$2a$10$baxj7U4mSfFmDb77SqpuFudoF.fipbn3nNcysOP1Pw4MrqKquyNtO', // contra es 'prueba123'
        role: 'sales',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eleazar Robles',
        email: 'eleazarobles@halcon.com',
        password: '$2a$10$baxj7U4mSfFmDb77SqpuFudoF.fipbn3nNcysOP1Pw4MrqKquyNtO', // contra es 'prueba123'
        role: 'purchasing',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samira Vazquez',
        email: 'samiravazquez@halcon.com',
        password: '$2a$10$baxj7U4mSfFmDb77SqpuFudoF.fipbn3nNcysOP1Pw4MrqKquyNtO', // contra es 'prueba123'
        role: 'warehouse',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sandra Salmon',
        email: 'sandrasalmon@halcon.com',
        password: '$2a$10$baxj7U4mSfFmDb77SqpuFudoF.fipbn3nNcysOP1Pw4MrqKquyNtO', // contra es 'prueba123'
        role: 'route',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
