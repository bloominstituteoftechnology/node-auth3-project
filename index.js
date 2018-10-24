const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());