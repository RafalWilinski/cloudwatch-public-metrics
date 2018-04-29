import express from "express";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import dotenv from "dotenv";
import { ServerStyleSheet } from "styled-components";
import AWS from "aws-sdk";
import { chunk } from "lodash";
import App from "./client/App";
import Html from "./client/Html";

dotenv.config();

const port = 3000;
const Namespace = "AWS/Lambda";
const server = express();

const cloudwatch = new AWS.CloudWatch();
const lambda = new AWS.Lambda();

const getStatisticValues = params => {
  return cloudwatch
    .getMetricStatistics({
      Namespace,
      ...params,
    })
    .promise();
};

server.get("/", async (req, res) => {
  try {
    const { Metrics } = await cloudwatch.listMetrics().promise();
    console.log(Metrics);
  } catch (error) {
    console.log(error);
  }

  // const metrics = await Promise.all(
  //   Metrics.map(metric => {
  //     if (metric.Dimensions[0] && metric.Dimensions[0].Name === "FunctionName") {
  //       //TODO: Scan instead of peeking first elem
  //       return getStatisticValues({
  //         MetricName: metric.MetricName,
  //         Dimensions: [metric.Dimensions[0]],
  //         EndTime: req.query.endTime || 1523134660,
  //         Period: req.query.period || 18000,
  //         StartTime: req.query.startTime || 1513134660,
  //         Statistics: ["Average"],
  //       });
  //     }
  //   }),
  // );

  const metrics = [];

  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<App metrics={metrics} />));
  const styles = sheet.getStyleTags();
  const title = "Lambda Dashboard";

  res.send(
    Html({
      body,
      styles,
      title,
    }),
  );
});

module.exports = server;
