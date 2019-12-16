const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "rowValue1", password: bcrypt.hashSync("123", 15) },
        { username: "rowValue2", password: bcrypt.hashSync("123", 15) },
        { username: "rowValue3", password: bcrypt.hashSync("123", 15) }
      ]);
    });
};
