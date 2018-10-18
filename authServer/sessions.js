const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const db = require("./database/dbConfig.js");

const server = express();

const sessionConfig = {
  store: new KnexSessionStore({
    tablename: "sessions",
    sidfieldname: "sid",
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60
  }),
  secret:
    "lorem ipsum dolor sit amet, i feel like chicken tonite, like chicken tonite!",
  name: "decadev",
  httpOnly: true, // non JS
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 10
  }
};

// use the sessionConfig
server.use(session(sessionConfig));

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Server Working!");
});
