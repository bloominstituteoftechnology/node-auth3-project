const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const restrictPath = require('./restrictPath')
const db = require('../data/dbConfig')

module.exports = server => {
  
  server.use(helmet());
  server.use(restrictPath())
  server.use(express.json());
  // set static routes 
  server.use(express.static('./client/build'))
  server.use(morgan('dev'));

}
