module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure there is at least one business before adding the column
    const Businesses = await queryInterface.sequelize.query(
      "SELECT id FROM Businesses LIMIT 1;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!Businesses.length) {
      throw new Error("No businesses found. Add at least one business before running this migration.");
    }

    await queryInterface.addColumn("Employees", "assigned_business_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: Businesses[0].id, // ✅ Assign employees to the first business
      references: {
        model: "Businesses",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Employees", "assigned_business_id");
  },
};
