module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BusinessOwners", {
      bo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bo_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      bo_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bo_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bo_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BusinessOwners");
  },
};
