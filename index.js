const express = require('express');
const server = express();
const knex = require('knex');
const dBConfig = require('./knexfile');
const bcrypt = require('bcryptjs');