'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('RolePermissions', ['business_id'], {
      name: 'idx_business_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('RolePermissions', 'idx_business_id');
  }
};
