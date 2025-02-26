"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RentedAssets", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Businesses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asset_type: {
        type: Sequelize.ENUM("property", "product"),
        allowNull: false,
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
      rent_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      advance_paid: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0,
      },
      total_paid: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0,
      },
      amount_due: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RentedAssets");
  },
};
