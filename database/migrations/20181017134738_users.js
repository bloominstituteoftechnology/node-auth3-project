exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // id
    tbl.increments();

    // username
    tbl
      .string('username', 128)
      .notNullable()
      .unique();

    // password and department
    tbl.string('password', 128).notNullable();
    tbl.string('department', 128).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};