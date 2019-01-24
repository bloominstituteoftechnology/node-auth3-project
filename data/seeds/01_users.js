exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: 'password1', department: 'sales' },
        { username: 'user2', password: 'password2', department: 'IT' },
        { username: 'user3', password: 'password3', department: 'finance' }
      ]);
    });
};
