const knexConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(knexConfig.development);

module.exports = {
    register,
    login,
    getUsers
}

function register(userCred) {
    return db('users')
    .insert(userCred)
    .returning('id');
}

function login(userCred) {
    return db('users')
    .where('username', '=', userCred.username)
    .first();
}

function getUsers() {
    return db('users');
}