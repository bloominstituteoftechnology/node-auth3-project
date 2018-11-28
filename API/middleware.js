// WEB API GLOBAL MIDDLEWARE
// ==============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = app => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
};
