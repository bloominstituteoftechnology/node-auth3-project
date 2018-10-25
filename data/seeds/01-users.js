
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Vee', password: 'kevin', department: 'Operations'},
        {username: 'Frank', password: 'hustle', department: 'Human Resoures'},
        {username: 'Fiona', password: 'goals', department: 'Finance'}
      ]);
    });
};
