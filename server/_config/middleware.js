const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const sessionOptions = {
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  httpOnly: true,
  secure: false,
  resave: true,
  saveUninitialized: false,
  name: 'nonno',
  store: new MongoStore({
    url: 'mongodb://localhost/sessions',
    ttl: 60 * 10
  })
}

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionOptions));
};
