'use strict';

export default {
  async up(queryInterface, Sequelize)  {
    await queryInterface.addColumn('inventory_items', 'unique_number', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('inventory_items', 'components', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn('inventory_items', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  }
};
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('inventory_items', 'unique_number');
    await queryInterface.removeColumn('inventory_items', 'components');
    await queryInterface.removeColumn('inventory_items', 'description');
  }