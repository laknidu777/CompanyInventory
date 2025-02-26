"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BusinessOwners", "bo_nic", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BusinessOwners", "bo_nic", {
      type: Sequelize.STRING,
      allowNull: false, // Revert back if needed
    });
  },
};
