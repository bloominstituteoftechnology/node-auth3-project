const knex = require('knex')
const knexConfig = require('../../knexfile')

const db = knex(knexConfig.development);


module.exports = {
    getUser: () => {
        return db('users')
            .select('id', 'username')
            .orderBy('id')
    },
    insert: (user) => {
        return db('users').insert(user)
    },
    findByUser: (username) => {
        return db('users').where('username', username).first()
    },
    getUserById: (id) => {
        return db('users').where({id}).first()
    }
 }