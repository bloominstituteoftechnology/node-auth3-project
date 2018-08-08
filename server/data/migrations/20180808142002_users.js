exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id').primary();
    t.string('username')
      .unique()
      .notNullable();
    t.string('password').notNullable();
    t.string('departments').notNullable();
  });
};

exports.down = function(knex, Promise) {};
