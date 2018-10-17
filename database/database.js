const knex = require('knex');
const knexConfig = require('../knexfile').development;

const database = knex(knexConfig);

module.exports = database;