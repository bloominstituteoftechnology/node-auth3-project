const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development)

module.exports = {
    get: (users) => {
        return db('usersWithDepartment').select('id', 'username', 'department')
    },

    insert: (user) => {
        return db('usersWithDepartment').insert(user)
    },

    findByUsername: (username) => {
        return db('usersWithDepartment').where('username', username);
    }
}