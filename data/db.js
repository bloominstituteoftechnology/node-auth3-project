const knexConfig = require('../knexfile');
const knex = require('knex');

const db = knex(knexConfig);

module.exports {
    get,
    register,
    login
}

function get(department) {
    return db('users').where('department', department);
}

function register(user) {
    const query = db('users').insert(user);
    return query.then(res => res[0].id);
}

function login(user) {
    const query = db('users').select('password').where('username', user.username);
    return query.then(res => {
        return res.length === 0
        ? 0
        : res[0].password
    });
}