const serverless = require("serverless-http");
const app = require("./dist/server");

// Idk why but process.env is not passed through to ./server.js
// Need to pass cfg vars via express.js internal storage
app.set("cloudwatch", {
  metricName: process.env.METRIC_NAME,
  duration: process.env.DURATION,
  dimensions: process.env.DIMENSIONS,
  statistic: process.env.STATISTIC,
});

module.exports.handler = serverless(app);
