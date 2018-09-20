const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auth').del()
    .then(function () {
      // Inserts seed entries
      return knex('auth').insert([
        {username: 'bob', password: bcrypt.hashSync('ipman',14), department: "managerial" },
        {username: 'tob', password: bcrypt.hashSync('ippo', 14), department: "managerial" },
        {username: 'hob', password: bcrypt.hashSync('ip', 14), department: "managerial" },
        {username: 'abob', password: bcrypt.hashSync('bipman',14), department: "plebiscite" },
        {username: 'atob', password: bcrypt.hashSync('bippo', 14), department: "plebiscite" },
        {username: 'ahob', password: bcrypt.hashSync('bip', 14), department: "plebiscite" }
      ]);
    });
};
