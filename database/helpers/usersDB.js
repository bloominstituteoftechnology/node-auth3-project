const db = require('../../dbConfig.js');

module.exports = {
  getUsers,
  addUser,
  findUser,
}

function getUsers() {
  return db('users');
};

function addUser(body) {
  return db('users')
    .insert(body)
    .then(ids => ids[0]);
};

function findUser(body) {
  return db('users')
    .where({ username: body.username })
    .first();
};