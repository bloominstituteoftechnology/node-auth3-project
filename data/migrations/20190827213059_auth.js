exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .varchar('username', 255)
      .unique()
      .notNullable();
    users.string('password', 255).notNullable();
    users.string('department', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
