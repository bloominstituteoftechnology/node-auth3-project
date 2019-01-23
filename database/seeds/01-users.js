exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'jim', password: 'oneway', department: 'sales'},
        {username: 'jill', password: 'oneway', department: 'sales'},
        {username: 'joe', password: 'oneway', department: 'HR'},
        {username: 'jen', password: 'oneway', department: 'HR'},
      ]);
    });
};