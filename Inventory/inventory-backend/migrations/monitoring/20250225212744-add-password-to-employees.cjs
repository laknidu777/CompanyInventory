"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Employees", "password", {
      type: Sequelize.STRING,
      allowNull: false, // Every employee must have a password
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Employees", "password");
  },
};
