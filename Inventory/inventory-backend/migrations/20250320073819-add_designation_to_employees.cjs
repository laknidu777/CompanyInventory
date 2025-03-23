module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Employees", "designation", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Employees", "designation");
  }
};
