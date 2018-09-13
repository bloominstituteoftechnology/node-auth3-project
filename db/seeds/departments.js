exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('departments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('departments').insert([
        { name: 'admin', access_level: 1 },
        { name: 'tech', access_level: 2 },
        { name: 'hr', access_level: 2 },
        { name: 'sales', access_level: 3 },
      ]);
    });
};
