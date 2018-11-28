exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (users) => {
    users.increments();
    users
      .string('username', 160)
      .notNullable()
      .unique();
    users.string('password', 160).notNullable();
    users.string('department', 160).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
