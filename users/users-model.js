const db = require('../data/dbConfig.js');

module.exports = {
    addNew,
    getUsers,
    findUserBy,
    getUserById,
    getUsersByDep,
}

function getUsers() {
    return db('users')
};

function getUserById(id) {
    return db('users')
    .where({ id })
    .first()
};

function findUserBy(filter) {
    return db('users')
    .where(filter)
    .first()
};

function addNew(user) {
    return db('users')
    .insert(user)
    .then(newUser => {
        return getUserById(newUser[0])
    });
};

function getUsersByDep(department) {
    return db('users')
    .where({ department })
    .first()
}