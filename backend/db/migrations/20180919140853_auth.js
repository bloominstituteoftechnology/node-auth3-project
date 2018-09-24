
exports.up = function(knex, Promise) {
  return knex.schema.createTable('auth', t => {
    t.increments()
    t
    .string('username', 16)
    .notNullable()
    .unique();
    t
    .string('password', 24)
    .notNullable();
    t
    .string('department')
    .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('auth')
};
