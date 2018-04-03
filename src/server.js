import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import dotenv from 'dotenv';
import App from './client/App';
import Html from './client/Html';

dotenv.config();
const port = 3000;
const server = express();

server.get('/', (req, res) => {
  const body = renderToString(<App />);
  const title = 'Lambda Dashboard';

  res.send(
    Html({
      body,
      title
    })
  );
});

module.exports = server;
