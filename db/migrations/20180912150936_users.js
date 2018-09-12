
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(users) {
    users.increments();

    users
      .string('userName', 120)
      .unique()
      .notNullable();

    users
      .string('password')
      .notNullable();

    users
      .string('department')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
