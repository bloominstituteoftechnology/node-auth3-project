const knexConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(knexConfig.development);

module.exports = {
    register,
    login,
    getUsers
}

function register() {

}

function login() {

}

function getUsers() {
    
}