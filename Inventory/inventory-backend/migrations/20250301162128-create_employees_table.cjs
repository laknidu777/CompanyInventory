"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employees", {
      emp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emp_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      emp_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_role: {
        type: Sequelize.ENUM("Manager", "Technician", "Staff"),
        allowNull: false,
      },
      bo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "BusinessOwners", // This should match the business owners table name
          key: "bo_id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Employees");
  },
};
