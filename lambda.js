const serverless = require('serverless-http');
const app = require('./dist/server');

module.exports.handler = serverless(app);