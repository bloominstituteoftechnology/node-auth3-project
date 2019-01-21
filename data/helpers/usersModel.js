const knex = require('knex');
const dbConfig = require('../../knexfile.js')

const db = knex(dbConfig.development);

module.exports = {
  addUser,
  getUsers
}

function addUser() {
  return db.insert('users')
}

function getUsers() {
  return db('users')
}