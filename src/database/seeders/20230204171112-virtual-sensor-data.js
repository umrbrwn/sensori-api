'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateSensorData } = require('../../helpers/sensor-data.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = [];
    // generate fake data for 60 days
    const now = Date.now();
    const sixtyDays = now + 5.184e9;
    for (let i = now; i < sixtyDays; i += 3600000) {
      data.push(generateSensorData(i));
    }
    await queryInterface.bulkInsert('sensor_activity', data, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sensor_activity', null, {});
  },
};
