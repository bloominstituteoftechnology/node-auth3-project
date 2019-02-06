const knex = require('knex')

const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

module.exports = {
  getUser: (id) => {
    if(id) {
      return db('users').where('id', id).first()
    } else {
      return db('users').select('id', 'username', 'department')
    }

  }
}