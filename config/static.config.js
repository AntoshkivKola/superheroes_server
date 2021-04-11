const path = require('path');
const { env } = require('process');

module.exports = {
  STATIC_PATH: env.STATIC_PATH || path.resolve(__dirname, '../public'),
};
