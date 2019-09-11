const db = require('../database/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('logins').select('id', 'username', 'department');
}

function findBy(filter) {
  return db('logins').where(filter);
}

async function add(user) {
  const [id] = await db('login').insert(user);

  return findById(id);
}

function findById(id) {
  return db('logins')
    .where({ id })
    .first();
}
