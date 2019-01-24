const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

const insertUser = (user) => {
   return db('users').insert(user);
};

const findByUsername = (username) => {
   return db('users').where('username', username).first();
};

const findById = (id) => {
   return db('users').where('id', id).first();
};

const findUsers = () => {
   return db('users').select('id', 'username');
};

module.exports = {
    insertUser, findByUsername, findById, findUsers
}


