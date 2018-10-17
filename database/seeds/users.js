
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'johnny', password: 'password123', department: 'student'},
        {username: 'jason', password: 'memew0rd123', department: 'instructor'},
        {username: 'james', password: '43524tgfgf', department: 'student success'}
      ]);
    });
};
