module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Businesses", "registration_number", {
          type: Sequelize.STRING,
          allowNull: true,
      });
      await queryInterface.addColumn("Businesses", "tax_id", {
          type: Sequelize.STRING,
          allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("Businesses", "registration_number");
      await queryInterface.removeColumn("Businesses", "tax_id");
  },
};
