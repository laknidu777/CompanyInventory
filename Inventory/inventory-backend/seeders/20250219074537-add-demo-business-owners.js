"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("BusinessOwners", [
      {
        bo_name: "Josh",
        bo_email: "josh@example.com",
        bo_contact_number: "12345678090",
        bo_address: "Colombo",
        bo_type: "Retail",
        bo_nic: "987652221V",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bo_name: "Jane Smith",
        bo_email: "janesmith@example.com",
        bo_contact_number: "0987654321",
        bo_address: "Kandy",
        bo_type: "Wholesale",
        bo_nic: "123456789V",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // If you need to undo the seed
    await queryInterface.bulkDelete("BusinessOwners", null, {});
  },
};
