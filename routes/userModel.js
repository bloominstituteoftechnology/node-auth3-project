const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    get,
    getByUsername,
    add
};

// Get all the users from the database
function get() {
    return db.select('id', 'username', 'department').from('users');
}

function getByUsername(username) {
    return db('users').where({ username: username }).first();
}

// Insert user into the database
function add(user) {
    return db('users').insert(user).into('users');
}