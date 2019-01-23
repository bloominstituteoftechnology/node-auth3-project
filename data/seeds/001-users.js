exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "KittyCat", password: "1234", department: "OneLiner" },
        { username: "FluffTail", password: "12345", department: "OneLiner" },
        { username: "MrTwister", password: "123456", department: "OneLiner" }
      ]);
    });
};
