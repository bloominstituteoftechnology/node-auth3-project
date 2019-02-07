const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {

    insertUser: (user) => {
        return db('users').insert(user);
    },

    findUser: (username) => {
        return db('users').where({ username });
    },

    getUsers: () => {
        return db('users');
    }

};