
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.string('username', 128).unique().notNullable();
    tbl.string('password', 256).notNullable();
    tbl.string('department', 256);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
