
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table){
      table.increments();
      table.string('username').unique()
      table.string('password')
      table.string('department');
  })
};

exports.down = function(knex, Promise) {
  
};
