
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('departments').del()
    .then(function () {
      // Inserts seed entries
      return knex('departments').insert([
        {
          id: 1, 
          name: 'system-admin',
          code: 333,
        },
        {
          id: 2, 
          name: 'hr',
          code: 901,
        },
        {
          id: 3, 
          name: 'accounting',
          code: 902,
        },
        {
          id: 4, 
          name: 'sales',
          code: 903,
        }
      ]);
    });
};
