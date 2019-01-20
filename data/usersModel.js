const dbConfig = require('..knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);

insertUser = (user) => {
    return db('users').insert(user)
}

findByUsername = (username) => {
    return db('users').where('username', username).first();
}

fetch = () => {
    return db('users').select('id', 'username');
}

module.exports = {
    insertUser, findByUsername, fetch
}