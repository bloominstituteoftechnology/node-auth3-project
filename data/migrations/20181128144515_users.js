exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    // Creates a ID that auto increments for each record
    users.increments();
    // Creates a field for the username
    users
      .string('username', 128)
      .notNullable()
      .unique();
    // Creates a field for the password
    users.string('password', 128).notNullable();
    // Creates a field for the department
    users.string('department', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
