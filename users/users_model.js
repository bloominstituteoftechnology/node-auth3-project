const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users').select("id", "username", "password");
}

function findBy(username) {
    return db('users')
        .where(username)
        .first();
}

async function add(user) {
    const [id] = await db('users').insert(user);
  
    return findById(id);
  }

function findById(id) {
   return db('users')
       .select('id', 'username', 'department')
       .where({ id })
       .first();
}