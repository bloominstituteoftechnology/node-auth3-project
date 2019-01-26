const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {

    insert: (user) => {
        return db('users').insert(user)
    },

<<<<<<< HEAD
    findByUserId: (username) => {
       return db('users').where('username', username);
    },

    getUsers: () => {
        return db("users")
=======
    findUserById: (username) => {
        return db('users').where({username: username})
>>>>>>> 5a42568710f255ead8e5e2bfc82c4cb215ebb93e
    }

    
}