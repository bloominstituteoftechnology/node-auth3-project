
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
      tbl.increments();
      tbl.string('username', 128).unique().notNullable();
      tbl.string('password').notNullable();
      tbl.string('department', 128).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
