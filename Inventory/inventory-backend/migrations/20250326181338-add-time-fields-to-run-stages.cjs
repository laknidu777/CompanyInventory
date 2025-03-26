'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("run_stages", "start_time", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("run_stages", "end_time", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("run_stages", "start_time");
  await queryInterface.removeColumn("run_stages", "end_time");
  }
};
