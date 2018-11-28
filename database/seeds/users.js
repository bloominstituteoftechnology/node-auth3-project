const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "robert",
          password: bcrypt.hashSync("password", 14),
          department: "sales"
        },
        {
          id: 2,
          username: "nesta",
          password: bcrypt.hashSync("password", 14),
          department: "marketing"
        },
        {
          id: 3,
          username: "marley",
          password: bcrypt.hashSync("password", 14),
          department: "support"
        }
      ]);
    });
};
