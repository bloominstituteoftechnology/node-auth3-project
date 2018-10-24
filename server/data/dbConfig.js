const knex = require('knex');
const knexConfig = require('./data.sqlite3');

module.exports = knex(knexConfig.development);