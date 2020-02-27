const knex = require('knex');
const config = require('./knexfile.js');

const dbEnv = process.env.DB_ENV || "development";
const configObj = config[dbEnv];

module.exports = knex(configObj);