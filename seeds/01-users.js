const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('password', 14);
const pass = bcrypt.hashSync('pass', 4);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          username: 'admin',
          password: password,
          department: 333
        },
        {
          id: 2, 
          username: 'hr',
          password: pass,
          department: 901
        },
        {
          id: 3, 
          username: '1acct',
          password: pass,
          department: 902
        },        
        {
          id: 4, 
          username: '2acct',
          password: pass,
          department: 902
        },
        {
          id: 5, 
          username: '1sales',
          password: pass,
          department: 903
        },
        {
          id: 6, 
          username: '2sales',
          password: pass,
          department: 903
        }
      ]);
    });
};
