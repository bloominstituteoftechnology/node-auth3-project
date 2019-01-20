
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'userone', password: 'abcdefghi', department: 'finance'},
        {username: 'usertwo', password: 'abcdefghi', department: 'history'},
        {username: 'userthree', password: 'abcdefghi', department: 'astrology'},
        {username: 'userfour', password: 'abcdefghi', department: 'finance'},
      ]);
    });
};