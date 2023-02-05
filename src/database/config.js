// eslint-disable-next-line @typescript-eslint/no-var-requires
const configurator = require('../../config.js')();

module.exports = {
  ...configurator().dbConfig,
  dialect: 'postgres',
};
