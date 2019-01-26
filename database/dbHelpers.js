const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {

    insert: (user) => {
        return db('users').insert(user)
    },

    findByUserId: (username) => {
       return db('users').where('username', username).first();
    },

    getUsers: () => {
        return db("users")
    }

    
}