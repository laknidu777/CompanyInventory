module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Employees", "createdEmpId", {
      type: Sequelize.INTEGER,
      allowNull: true, // ✅ Allow NULL for existing rows first
      references: {
        model: "Employees",
        key: "emp_id",
      },
      onDelete: "CASCADE",
    });

    // ✅ Set a default value for existing employees (if applicable)
    await queryInterface.sequelize.query(`
      UPDATE Employees SET createdEmpId = NULL WHERE createdEmpId IS NULL;
    `);

    // ✅ After setting values, make it NOT NULL
    await queryInterface.changeColumn("Employees", "createdEmpId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "emp_id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Employees", "createdEmpId");
  },
};
