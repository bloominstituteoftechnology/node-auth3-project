const db = require('../data/dbConfig.js');

function insert(user) {
    return db('users')
    .insert(user, 'id')
    .then((id) => id);
}

function findBy(where) {
    return db('users').where(where);
}

function findByUsername(username) {
    return findBy({ username }).first();
}

function find() {
    return db('users');
}

module.exports = {
    insert,
    findBy,
    findByUsername,
    find
};