import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { DateTime } from "luxon";
import AWS from "aws-sdk";
import { chunk } from "lodash";
import App from "./client/App";
import Error from "./client/Error";
import Html from "./client/Html";

const port = 3000;
const server = express();

const cloudwatch = new AWS.CloudWatch();
const lambda = new AWS.Lambda();

const render = (body, title, sheet, res) => {
  const styles = sheet.getStyleTags();

  res.send(
    Html({
      body,
      styles,
      title,
    }),
  );
};

server.get("/", async (req, res) => {
  const sheet = new ServerStyleSheet();

  try {
    const { METRIC_NAME, DURATION } = process.env;
    const MetricName = METRIC_NAME.split("//")[1];
    const Namespace = METRIC_NAME.split("//")[0];
    const DurationKey = DURATION.split(" ")[1];
    const DurationValue = DURATION.split(" ")[0];
    const StartTime = DateTime.local().minus({ [DurationKey]: DurationValue });

    const params = {
      MetricName,
      Namespace,
      EndTime: DateTime.local(),
      Period: 180,
      StartTime,
    };

    const data = await cloudwatch.getMetricStatistics(params).promise();
    const body = renderToString(sheet.collectStyles(<App metrics={data} />));

    return render(body, METRIC_NAME, sheet, res);
  } catch (error) {
    console.log(error);
    const body = renderToString(sheet.collectStyles(<Error error={error.stack} />));
    return render(body, "Error", sheet, res);
  }
});

module.exports = server;
