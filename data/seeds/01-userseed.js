
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "example user name 1", password: "pajamas 11"},
        {username: "example user name 2", password: "pajamas 22"},
        {username: "example user name 3", password: "pajamas 33"}
      ]);
    });
};
