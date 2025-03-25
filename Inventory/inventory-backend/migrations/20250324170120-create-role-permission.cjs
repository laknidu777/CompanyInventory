module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RolePermissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Businesses", // ✅ Your existing businesses table
          key: "id",
        },
        onDelete: "CASCADE",
      },
      role: {
        type: Sequelize.ENUM("Admin", "Manager", "HR", "Editor"),
        allowNull: false,
      },
      module: {
        type: Sequelize.ENUM(
          "Employees",
          "Inventory",
          "Processes",
          "Sales",
          "Purchases",
          "Income",
          "Reports",
          "Business Profile"
        ),
        allowNull: false,
      },
      permissions: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          Create: false,
          Read: false,
          Update: false,
          Delete: false
        },
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

    // Add unique constraint: one permission set per role + module + business
    await queryInterface.addConstraint("RolePermissions", {
      fields: ["business_id", "role", "module"],
      type: "unique",
      name: "unique_role_module_business"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RolePermissions");
  }
};
