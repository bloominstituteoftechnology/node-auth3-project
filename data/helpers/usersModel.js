const knex = require('knex');
const dbConfig = require('../../knexfile.js')

const db = knex(dbConfig.development);

module.exports = {
  addUser,
  getUserByUsername,
  getUserById,
  getUsers
}

function addUser(data) {
  return db('users').insert(data)
}

function getUserByUsername(username) {
  return db('users').where('username', username)
}

function getUserById(id) {
  return db('users').where({id}).first()
}

function getUsers() {
  return db('users')
}