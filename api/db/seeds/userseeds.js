
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userName: 'rowValue1',Password:'fasdfasdf',department:'fasdlkfj'},
        {userName: 'rowValue2',Password:'fasdfasdf',department:'fasdlkfj'},
        {userName: 'rowValue3',Password:'fasdfasdf',department:'fasdlkfj'}
      ]);
    });
};