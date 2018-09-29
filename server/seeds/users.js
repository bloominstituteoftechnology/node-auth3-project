
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, department: 'd1', username: 'rowValue1', password:'hello'},
        {id: 2, department: 'd1', username: 'rowValue2', password:'hello'},
        {id: 3, department: 'd1', username: 'rowValue3', password:'hello'}
      ]);
    });
};


