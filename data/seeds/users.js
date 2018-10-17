
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // inserts seed entries
      return knex('users').insert([
        { username: 'Evan', password: 'p4ssw0rd', department: 'A' },
        { username: 'testuser1', password: 'birthday', department: 'B' },
        { username: 'testuser2', password: 'maidenname', department: 'B' }
      ]);
    });
};
