const db = require('../../dbConfig.js');

module.exports = {
  getUsers,
  addUser
}

function getUsers() {
  return db('users');
};

function addUser(body) {
  return db('users')
    .insert(body)
    .then(ids => ids[0]);
};