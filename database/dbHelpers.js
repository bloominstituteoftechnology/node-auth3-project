const knex = require('knex');

const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

module.exports = {
    
    insert: (user) => {
        return db('userInfo').insert(user);
    },
    
    findByUser: (username) => {
        return db('userInfo').where('username', username);
    },

    selectAllUsers: (list) => {
        return db('userInfo').select('id', 'username');
    },

};