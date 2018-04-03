import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import dotenv from 'dotenv';
import App from './client/App';
import Html from './client/Html';
import { ServerStyleSheet } from 'styled-components';

dotenv.config();
const port = 3000;
const server = express();

server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<App />));
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
