const knes = require("knex");
const config = require("./knexfile.js");

module.exports = knex(config.development);
