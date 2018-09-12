exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users
        .string('username', 120)
        .notNullable()
        .unique();
      users.string('password', 120).notNullable();
      users.string('department', 120);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  