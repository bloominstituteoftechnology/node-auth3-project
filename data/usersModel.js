const dbConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(dbConfig.development);

add = (user) => {
    return db('users').insert(user)
}

login = (username) => {
    return db('users').where('username', username).first();
}

fetch = () => {
    return db('users')
        .then(response => {
            const mapped = response.map(x => {
                return x.username
            })
            return mapped
        })
}

module.exports = {
    add, login, fetch
}