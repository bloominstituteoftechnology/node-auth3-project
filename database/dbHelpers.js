const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

module.exports = {

    insert: (user) => {
        return db('users').insert(user)
    },

    findUserById: (userId) => {
        return db('users').where({id: userId})
    }
}