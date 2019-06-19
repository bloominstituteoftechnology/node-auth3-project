const db = require('../../data/dbConfig.js');

module.exports = {
    find, 
    findBy,
    findById,
    add,
}


function find() {
    return db('users').select('id', 'username', 'password', 'department');
}

function findBy(filterByUser) {
    return db('users').where(filterByUser);
}

function findById(id) {
    return db('users')
    .where({id})
    .first();
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}