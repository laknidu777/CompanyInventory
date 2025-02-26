module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employees", {
      emp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emp_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      emp_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_department: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("Employees");
  },
};
