'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('runs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      pipeline_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'pipelines', key: 'id' },
        onDelete: 'CASCADE'
      },
      inventory_item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'inventory_items', key: 'id' },
        onDelete: 'CASCADE'
      },
      assigned_to: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Not Started', 'In Progress', 'Completed'),
        defaultValue: 'Not Started'
      },
      created_by: Sequelize.STRING,
      updated_by: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('runs');
  }
};
