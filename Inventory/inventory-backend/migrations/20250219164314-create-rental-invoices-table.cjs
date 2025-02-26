"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RentalInvoices", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      rented_asset_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "RentedAssets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount_due: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0,
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "completed"),
        defaultValue: "pending",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RentalInvoices");
  },
};
