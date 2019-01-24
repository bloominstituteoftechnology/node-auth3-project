const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex('dbConfig.development');

const insert = (user) => {
   return db('users').insert(user);
};

const findByUsername = (username) => {
   return db('users').where('username', username).first();
};

const findById = (id) => {
   return db('users').where('id', id).first();
};

const findUsers = () => {
   return db('users').select('id', username);
};

module.exports = {
    insert, findByUsername, findById, findUsers
}


