exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accounts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {name: 'Frodo', password:"chozen1", department:"fellowship"},
        {name: 'Sam', password:"1/2wise", department:"fellowship"},
        {name: 'Pippin', password:"fool0Took", department:"fellowship"}
      ]);
    });
};
