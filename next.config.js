const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");

const config = {
  target: "serverless",
  assetPrefix: "https://s3.amazonaws.com/cloudwatch-public-metrics"
};

module.exports = withTypescript(withCSS(config));
