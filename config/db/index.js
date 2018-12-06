const process = require('process');

const env = process.env.NODE_ENV;

if (env === 'production') {
  module.exports = require('./db-prod');
} else {
  module.exports = require('./db-dev');
}
