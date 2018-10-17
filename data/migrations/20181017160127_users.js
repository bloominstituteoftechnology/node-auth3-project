
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username').notNullable();
      table.unique('username');
      table.string('password').notNullable();
      table.string('department').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
