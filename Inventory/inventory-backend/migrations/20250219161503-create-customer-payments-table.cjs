"use strict";

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CustomerPayments", {
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
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM("large_scale", "small_products"),
        allowNull: false,
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "completed"),
        defaultValue: "pending",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CustomerPayments");
  },
};
