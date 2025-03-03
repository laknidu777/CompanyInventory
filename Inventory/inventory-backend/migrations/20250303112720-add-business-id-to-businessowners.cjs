module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("BusinessOwners", "business_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // A Business Owner can have multiple businesses
      references: {
        model: "Businesses", // ✅ Ensure it matches the Businesses table
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("BusinessOwners", "business_id");
  },
};
