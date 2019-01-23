const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
  insertUser: (user) => {
    return db('users').insert(user);
  },
  findByUsername: (username) => {
    return db('users').where('username', username).first();
  },
  findByID: (id) => {
    return db('users').where('id', id).first();
  },
  getUsers: (users) => {
    return db('users').select('id', 'username','password')
  }
}