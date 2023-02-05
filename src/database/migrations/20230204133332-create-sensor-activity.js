'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_activity', {
      sensor_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      timestamp: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      data: Sequelize.JSON,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sensor_activity');
  },
};
