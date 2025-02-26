"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ManufacturingProcesses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ManufacturedProducts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      process_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      step_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_dependent: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      estimated_time: {
        type: Sequelize.INTEGER, // Time in hours
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ManufacturingProcesses");
  },
};
