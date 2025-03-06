module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Businesses", "business_type", {
      type: Sequelize.ENUM("Buying & Selling", "Manufacturing", "Renting"),
      allowNull: false,
      //defaultValue: "Buying & Selling", // Set a default category
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Businesses", "business_type");
  }
};
