//grab knex file development object
const knex = require('knex');
const dbConfig = require('../knexfile');

module.exports = knex(dbConfig.development);