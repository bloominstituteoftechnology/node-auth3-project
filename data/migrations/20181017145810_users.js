exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();

    tbl
      .string('username', 50)
      .notNullable()
      .unique();
    tbl.string('password', 100).notNullable();
    tbl.string('department', 100).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
