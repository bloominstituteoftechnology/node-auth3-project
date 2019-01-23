exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments(); //defaults into a column that increments id

    tbl
      .string('username')
      .notNullable()
      .unique();

    tbl.string('name').notNullable();

    tbl.string('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
