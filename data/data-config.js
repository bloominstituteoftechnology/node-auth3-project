require('dotenv').config();

const knex = require('knex');
const config = require('../knexfile');

const DB_ENV = process.env.DB_ENV || 'development';

module.exports = knex(config[DB_ENV]);