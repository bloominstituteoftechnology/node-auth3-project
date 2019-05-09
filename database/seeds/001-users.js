exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "irving", password: "password" },
        { id: 2, username: "rowValue2", password: "password" },
        { id: 3, username: "rowValue3", password: "password" }
      ]);
    });
};
