const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const restrictPath = require('./restrictPath')
const db = require('../data/dbConfig')

module.exports = server => {
  // set static routes 
  server.use(express.static('./client/build'))
  server.use(helmet());
  // server.use(restrictPath())
  server.use(express.json());
  server.use(morgan('dev'));
}