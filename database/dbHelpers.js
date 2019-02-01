const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

module.exports = {
    get: (users) => {
        return db('users').select('id', 'username')
    },

    insert: (user) => {
        return db('users').insert(user)
    },

    findByUsername: (username) => {
        return db('users').where('username', username);
    }
}