const knex = require('knex')

const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

module.exports = {
  register: (creds) => {
    return db('users').insert(creds)
  },

  login: (username) => {
    return db('users').where('username', username).first()
  }
}