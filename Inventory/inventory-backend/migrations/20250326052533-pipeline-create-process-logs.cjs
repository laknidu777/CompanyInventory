'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('process_logs', {
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
        allowNull: true,
        references: { model: 'pipeline_stages', key: 'id' },
        onDelete: 'SET NULL'
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      performed_by: Sequelize.STRING,
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      remarks: Sequelize.TEXT
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('process_logs');
  }
};
