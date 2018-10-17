const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    get
};

// Get all the users from the database
function get() {
    return db('users');
}