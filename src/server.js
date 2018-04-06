import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import dotenv from 'dotenv';
import { ServerStyleSheet } from 'styled-components';
import AWS from 'aws-sdk';
import { chunk } from 'lodash';
import App from './client/App';
import Html from './client/Html';

dotenv.config();
const port = 3000;
const server = express();

const cloudwatch = new AWS.CloudWatch();
const lambda = new AWS.Lambda();

const getStatisticValues = () => {} // todo

server.get('/', async (req, res) => {
  const { Metrics } = await cloudwatch.listMetrics({
    Namespace: 'AWS/Lambda'
  }).promise();

  const funcMetrics = {};

  Metrics.forEach((metric) => {
    if (metric.Dimensions[0] && metric.Dimensions[0].Name === 'FunctionName') { //TODO: Scan instead of peeking first el
      const name = metric.Dimensions[0].FunctionName.Name;
      if (!funcMetrics.hasOwnProperty(name)) {
        funcMetrics[name] = {};
      }
      
      funcMetrics[name][metric.MetricName] = getStatisticValues(metric.MetricName, metric.Dimensions[0]);
    }
  })

  console.log(metrics);

  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<App metrics={metrics} />));
  const styles = sheet.getStyleTags();
  const title = 'Lambda Dashboard';
  
  res.send(
    Html({
      body,
      styles,
      title
    })
  );
});

module.exports = server;
