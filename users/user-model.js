const db = require('../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
};

function find() {
  return db('users').select('department', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [username] = await db('users').insert(user);

  return findById(id);
}
