
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
      users.increment();

      user.string('username', 128).notNullable().unique();
      user.string('password', 128).notNullable().unique();
      user.string('department', 128).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
