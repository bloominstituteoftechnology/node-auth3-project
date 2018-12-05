const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

const sessionConfig = {
    secret: "jifeowmdeidgfmw432l;421rqewfjiof0-o23rkoq",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store : new knexSessionStore({
      tablename: 'sessions',
      sidfieldname: 'sid',
      knex: db,
      createtable: true,
      clearInterval: 1000 * 60 * 60
  })
};

server.use(session(sessionConfig));
server.use(express.json());

server.get('/', (req, res) => {
    res.send('The hills are alive...');
});

server.listen(9000, () => console.log("\n Port 9000 \n"));