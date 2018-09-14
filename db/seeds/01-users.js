
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Mac123', password: 'pass1', roleId: 4},
        {username: 'Charlie123', password: 'pass2', roleId: 1},
        {username: 'Frank123', password: 'pass3', roleId: 3}
      ]);
    });
};
