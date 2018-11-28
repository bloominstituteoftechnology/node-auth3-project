exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: 'userpass1', department: 'dept1' },
        { username: 'user2', password: 'userpass2', department: 'dept2' },
        { username: 'user3', password: 'userpass3', department: 'dept3' }
      ]);
    });
};
