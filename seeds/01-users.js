exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed 
      return knex('users').insert([ 
        {id: 1, username: 'Sean Tyas', password: 'Lovely', department: 'consumer'},
        {id: 2, username: 'Leon Mance', password: 'LimeLight', department: 'consumer'},
        {id: 3, username: 'Taylor Goose', password: 'Amazing', department: 'consumer'}
      ]);
    })}