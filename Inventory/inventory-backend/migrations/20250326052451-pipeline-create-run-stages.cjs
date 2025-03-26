'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('run_stages', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      run_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'runs', key: 'id' },
        onDelete: 'CASCADE'
      },
      stage_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'pipeline_stages', key: 'id' },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('Not Started', 'In Progress', 'Completed'),
        defaultValue: 'Not Started'
      },
      updated_by: Sequelize.STRING,
      updated_at: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('run_stages');
  }
};
