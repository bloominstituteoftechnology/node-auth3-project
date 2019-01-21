const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "eric", password: bcrypt.hashSync("1234", 16), department: "sales"},
        {username: "stan", password: bcrypt.hashSync("1234", 16), department: "production"},
        {username: "kyle", password: bcrypt.hashSync("1234", 16), department: "production"},
        {username: "kenny", password: bcrypt.hashSync("1234", 16), department: "production"},
        {username: "butters", password: bcrypt.hashSync("1234", 16), department: "sales"},
      ]);
    });
};
