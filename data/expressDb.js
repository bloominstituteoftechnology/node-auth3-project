// Bring in knex
const knex = require("knex");

// Knex Configuration File
const knexConfiguration = require("../knexfile.js");

// Define Database Configuration
module.exports = knex(knexConfiguration.development);
