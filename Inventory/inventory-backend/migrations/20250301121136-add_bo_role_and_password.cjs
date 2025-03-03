"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("BusinessOwners", "bo_role", {
      type: Sequelize.ENUM("Super Admin", "Admin", "Viewer"),
      allowNull: false,
      //defaultValue: "Admin",
    });

    await queryInterface.addColumn("BusinessOwners", "bo_password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("BusinessOwners", "bo_role");
    await queryInterface.removeColumn("BusinessOwners", "bo_password");
  },
};
