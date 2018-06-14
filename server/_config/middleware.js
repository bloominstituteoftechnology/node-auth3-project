const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

module.exports = function(server) {

  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors());
  const sessionOptions = {
    secret: "it's a secret!",
    cookie: {
      maxAge: 1000 * 60 * 60 // this is equal to one hour
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: "SuperSecretDB"
  };
  
  server.use(session(sessionOptions));

};
