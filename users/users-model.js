const db = require('../data/dbConfig.js')

module.exports = {
    addUser,
    getUsers,
    getUserByName,
    getUserByDepartment,
    getUserById
}

function getUsers() {
    return db('users')
        .select('username')
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .select('username')
        .first()
}

function getUserByName(username) {
    return db('users')
        .where({ username })
        .first()
}

function getUserByDepartment(department) {
    return db('users')
        .where({ department })
        .first()
}

async function addUser(user) {
    const [id] = await db('users').insert(user)
    return getUserById(id)
}