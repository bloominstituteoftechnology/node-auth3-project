// WEB API GLOBAL MIDDLEWARE
// ==============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

module.exports = app => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/', 'build')));
    app.get('/*', (_, res) => {
      res.sendFile(path.join(__dirname, '../client/', 'build/index.html'), err => {
        if (err) res.status(500).send(err);
      });
    });
  }
};
