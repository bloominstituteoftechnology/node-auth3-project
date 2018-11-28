exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments('id')
    users
      .string('username', 128)
      .unique()
      .notNullable()
    users
      .string('password', 256)
      .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(users)
};