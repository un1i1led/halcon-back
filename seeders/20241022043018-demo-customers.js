'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('customers', [
    {
      name: 'Acme Corporation',
      fiscalData: '123456789',
      address: '123 Business Ave, Culiacan, Sinaloa',
      phone: '+526676945505',
      customerNumber: '100001',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'TechStart Solutions',
      fiscalData: '231456789',
      address: '321 Innovation Drive, Culiacan, Sinaloa',
      phone: '+526677149005',
      customerNumber: '117302',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Global Traders Inc.',
      fiscalData: '111156779',
      address: '456 Commerce St, Culiacan, Sinaloa',
      phone: '+526673145707',
      customerNumber: '201013',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Local Market Chain',
      fiscalData: '873496189',
      address: '202 Retail Row, Culiacan, Sinaloa',
      phone: '+526675557521',
      customerNumber: '738109',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Creative Design Studio',
      fiscalData: '443156789',
      address: '147 Art Ave, Culiacan, Sinaloa',
      phone: '+526676945505',
      customerNumber: '625801',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
