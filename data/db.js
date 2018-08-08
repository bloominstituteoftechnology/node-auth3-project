const knexConfig = require('../knexfile');
const knex = require('knex');

const db = knex(knexConfig.development);

module.exports = {
    get,
    register,
    login
};

async function get(username) {
    const department = await db('users').select('department').where('username', username);
    if (department[0].department == 'Administration') {
        return db('users').select('id', 'username', 'department');
    } else {
        return db('users').select('id', 'username', 'department').where('department', department[0].department);
    }
}

function register(user) {
    const query = db('users').insert(user);
    return query.then(res => {
        return res[0]
    });
}

function login(user) {
    const query = db('users').select('password').where('username', user.username);
    return query.then(res => {
        return res.length === 0
        ? 0
        : res[0].password
    });
}