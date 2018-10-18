const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session'); // added this library
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('./database/dbConfig.js');

const server = express();

const sessionConfig = {
  store: new KnexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60, // removes only expired sessions
  }),
  secret: 'nobody-tosses.a%dwarf.!',
  name: 'monkey', // defaults to connect.sid
  httpOnly: true, // JS can't access this
  resave: false,
  saveUninitialized: false, // laws !
  cookie: {
    secure: false, // over httpS
    maxAge: 1000 * 60 * 10,
  },
};
server.use(session(sessionConfig));

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

// implemented this
server.post('/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;
