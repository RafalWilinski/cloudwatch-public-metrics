const serverless = require("serverless-http");
const app = require("./dist/server");

// Idk why but process.env is not passed through to ./server.js while using sls-offfline
// Need to pass cfg vars via express.js internal storage
app.set("cloudwatch", {
  metricName: process.env.METRIC_NAME,
  metricTitle: process.env.METRIC_TITLE,
  metricDuration: process.env.METRIC_DURATION,
  metricDimensions: process.env.METRIC_DIMENSIONS.split(",").map(dimension => ({
    Name: dimension.split("=")[0],
    Value: dimension.split("=")[1],
  })),
  metricStatistic: process.env.METRIC_STATISTIC,
  metricSuffix: process.env.METRIC_SUFFIX,
});

module.exports.handler = serverless(app);
