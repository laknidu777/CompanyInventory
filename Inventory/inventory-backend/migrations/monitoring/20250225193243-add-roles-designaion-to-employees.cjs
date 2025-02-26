"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify existing emp_role column to ENUM type
    await queryInterface.changeColumn("Employees", "emp_role", {
      type: Sequelize.ENUM("Super Admin", "Admin", "HR", "Manager", "Viewer"),
      allowNull: false,
      defaultValue: "Viewer",
    });

    // Check if emp_designation exists before adding
    const table = await queryInterface.describeTable("Employees");
    
    if (!table.emp_designation) {
      await queryInterface.addColumn("Employees", "emp_designation", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Revert emp_role back to STRING (optional)
    await queryInterface.changeColumn("Employees", "emp_role", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove emp_designation column
    await queryInterface.removeColumn("Employees", "emp_designation");

    // Drop ENUM type (optional, to avoid caching issues)
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Employees_emp_role\";");
  },
};
