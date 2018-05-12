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
    const {
      metricName,
      metricTitle,
      metricDuration,
      metricDimensions,
      metricStatistic,
      metricSuffix,
    } = server.get("cloudwatch");

    const MetricName = metricName.split("//")[1];
    const Namespace = metricName.split("//")[0];
    const DurationKey = metricDuration.split(" ")[1];
    const DurationValue = metricDuration.split(" ")[0];
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
      Dimensions: metricDimensions,
      Statistics: [metricStatistic],
    };

    const { Datapoints } = await cloudwatch
      .getMetricStatistics(params)
      .promise();

    const body = renderToString(
      sheet.collectStyles(
        <App
          data={Datapoints}
          statistic={metricStatistic}
          title={metricTitle || metricName}
          suffix={metricSuffix}
        />,
      ),
    );

    return render(body, metricTitle || metricName, sheet, res);
  } catch (error) {
    const body = renderToString(
      sheet.collectStyles(<Error error={error.stack} />),
    );

    return render(body, "Error", sheet, res);
  }
});

module.exports = server;
