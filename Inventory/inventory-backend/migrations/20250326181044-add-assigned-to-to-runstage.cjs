'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.addColumn('run_stages', 'assigned_to', {
  type: Sequelize.STRING,
  allowNull: true,
});
  },
  down: async (queryInterface, Sequelize) => {
await queryInterface.removeColumn('run_stages', 'assigned_to');
  }
};