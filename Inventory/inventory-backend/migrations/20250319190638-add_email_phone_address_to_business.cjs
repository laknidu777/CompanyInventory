module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Businesses", "email", {
          type: Sequelize.STRING,
          allowNull: false, // Required field
      });
      await queryInterface.addColumn("Businesses", "phone", {
          type: Sequelize.STRING,
          allowNull: false, // Required field
      });
      await queryInterface.addColumn("Businesses", "address", {
          type: Sequelize.STRING,
          allowNull: true, // Optional field
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("Businesses", "email");
      await queryInterface.removeColumn("Businesses", "phone");
      await queryInterface.removeColumn("Businesses", "address");
  }
};
