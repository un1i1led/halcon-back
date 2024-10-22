'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        deliveryAddress: '123 Business Ave, Culiacan, Sinaloa',
        notes: '',
        status: 'Ordered',
        customerNumber: '100001',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryAddress: '321 Innovation Drive, Culiacan, Sinaloa',
        notes: '',
        status: 'Ordered',
        customerNumber: '117302',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryAddress: '456 Commerce St, Culiacan, Sinaloa',
        notes: '',
        status: 'Ordered',
        customerNumber: '201013',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryAddress: '202 Retail Row, Culiacan, Sinaloa',
        notes: '',
        status: 'Ordered',
        customerNumber: '738109',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        deliveryAddress: '147 Art Ave, Culiacan, Sinaloa',
        notes: '',
        status: 'Ordered',
        customerNumber: '625801',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
