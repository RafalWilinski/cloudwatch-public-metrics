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
    const { metricName, duration, dimensions, statistic } = server.get("cloudwatch");

    const MetricName = metricName.split("//")[1];
    const Namespace = metricName.split("//")[0];
    const DurationKey = duration.split(" ")[1];
    const DurationValue = duration.split(" ")[0];
    const StartTime = DateTime.local()
      .minus({ [DurationKey]: DurationValue })
      .toUTC()
      .toISO();
    const EndTime = DateTime.local()
      .toUTC()
      .toISO();

    const params = {
      MetricName,
      Namespace,
      EndTime,
      Period: 1800,
      StartTime,
      Dimensions: dimensions,
      Statistics: [statistic],
    };

    const { Datapoints } = await cloudwatch.getMetricStatistics(params).promise();
    console.log(Datapoints);
    const body = renderToString(
      sheet.collectStyles(<App data={Datapoints} statistic={statistic} />),
    );

    return render(body, metricName, sheet, res);
  } catch (error) {
    console.log(error);
    const body = renderToString(sheet.collectStyles(<Error error={error.stack} />));
    return render(body, "Error", sheet, res);
  }
});

module.exports = server;
