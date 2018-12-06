exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments(); //pk 
      users
      .string('username', 133)
      .notNullable()
      .unique();
    users.string('password', 133).notNullable();
    users.string('department', 133).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
