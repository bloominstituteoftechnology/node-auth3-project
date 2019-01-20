const dbConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(dbConfig.development);

add = (user) => {
    return db('users').insert(user)
}

findByUsername = (username) => {
    return db('users').where('username', username).first();
}

fetch = () => {
    return db('users').select('id', 'username');
}

module.exports = {
    add, findByUsername, fetch
}