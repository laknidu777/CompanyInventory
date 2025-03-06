module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure Clients Table is created first before assigning foreign keys
    await queryInterface.createTable("Clients", {
      client_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "Businesses", key: "id" } },
      client_name: { type: Sequelize.STRING, allowNull: false },
      client_email: { type: Sequelize.STRING, allowNull: false, unique: true },
      client_phone: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Create manu_product Table
    await queryInterface.createTable("manu_product", {
      product_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "Businesses", key: "id" } },
      product_name: { type: Sequelize.STRING, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM("Pending", "In Progress", "Completed"), defaultValue: "Pending" },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Create manu_process Table
    await queryInterface.createTable("manu_process", {
      process_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "manu_product", key: "product_id" } },
      process_name: { type: Sequelize.STRING, allowNull: false },
      type: { type: Sequelize.ENUM("Dependent", "Independent"), allowNull: false },
      estimated_time: { type: Sequelize.INTEGER, allowNull: true },
      status: { type: Sequelize.ENUM("Pending", "Ongoing", "Completed"), defaultValue: "Pending" },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Create manu_process_dependency Table
    await queryInterface.createTable("manu_process_dependency", {
      dependency_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      process_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "manu_process", key: "process_id" } },
      dependent_on: { type: Sequelize.INTEGER, allowNull: true, references: { model: "manu_process", key: "process_id" } },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Create manu_process_assignment Table (Fixed foreign key issue)
    await queryInterface.createTable("manu_process_assignment", {
      assignment_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "Clients", key: "client_id" } },
      product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "manu_product", key: "product_id" } },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("manu_process_assignment");
    await queryInterface.dropTable("manu_process_dependency");
    await queryInterface.dropTable("manu_process");
    await queryInterface.dropTable("manu_product");
    await queryInterface.dropTable("Clients");
  },
};
