const knex = require('knex');

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

module.exports = {
    insert: (user) => {
        return db('users').insert(user);
    },

    findByUsername: (username) => {
        return db('users').where('username', username);
    },

    findUsers: () => {
        return db('users').select('id', 'username');
    }
};