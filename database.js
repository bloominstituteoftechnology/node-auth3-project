

//== Database Configuration ====================================================

//-- Dependencies --------------------------------
const knex = require('knex');
const knexConfig = require('./knexfile.js');

//-- Configure and Export ------------------------
module.exports = knex(knexConfig[process.env.DATABASE_ENVIRONMENT]);
