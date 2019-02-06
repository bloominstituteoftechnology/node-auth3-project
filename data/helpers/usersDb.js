const knex = require('knex')

const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

module.exports = {
  getUser: (id) => {
    id ? 
      db('users').where('id', id).first(): 
        db('users').select('id', 'username', 'department')
  }
}