const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  // Hash passwords for seeds
  const passwordIn = bcrypt.hashSync('password', 10)
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { userName: 'Bilbo', password: passwordIn, department: 'rings'},
        { userName: 'Frodo', password: passwordIn, department: 'rings'},
        { userName: 'Gimli', password: passwordIn, department: 'metal-working'}
      ]);
    });
};
