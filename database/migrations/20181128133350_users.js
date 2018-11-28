
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', tbl => {
      tbl
        .increments();
      tbl
        .string('username', 128)
        .unique()
        .notNullable();
      tbl
        .string('password', 256)
        .notNullable();
      tbl
        .string('department', 256)
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
