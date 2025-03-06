module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Clients", {
      client_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "Businesses", key: "id" } },
      client_name: { type: Sequelize.STRING, allowNull: false },
      client_email: { type: Sequelize.STRING, allowNull: false, unique: true },
      client_phone: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clients");
  },
};
