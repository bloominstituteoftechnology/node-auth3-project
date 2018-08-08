
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(users) {
    users.increments();

    users.text('username', 128)
    .notNullable()
    .unique();

    users.text('password')
    .notNullable();

    users.text('department')
    .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
