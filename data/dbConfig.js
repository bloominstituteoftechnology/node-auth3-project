const config = require('../knexfile');

const knex = require('knex');

module.export = knex(config.development);
