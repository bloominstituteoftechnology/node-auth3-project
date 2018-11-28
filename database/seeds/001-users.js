const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {id: 1, username: 'user1', password: 'notEncryped', department: 'sales'},
      {id: 2, username: 'user2', password: bcrypt.hashSync('encrypted', 14), department: 'marketing'},
      {id: 3, username: 'user3', password: bcrypt.hashSync('password', 14), department: 'product'}
    ]);
  });
};
